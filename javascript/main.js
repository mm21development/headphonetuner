let audioCtx = null, preampNode = null, sineOsc = null, sineGain = null, noiseSource = null, noiseGain = null,
    limiterNode = null;
let mediaSource = null;
let isSinePlaying = false, isNoisePlaying = false, eqEnabled = true;
let exportPreampDb = 0, currentMaxG = 0;
let filterIdCounter = 0;
const filters = [];

let sweepAnimFrame = null;
let currentSweepDir = 0;
let currentSweepFreq = 440;

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    preampNode = audioCtx.createGain();
    limiterNode = audioCtx.createDynamicsCompressor();
    limiterNode.threshold.value = -0.1;
    limiterNode.knee.value = 0.0;
    limiterNode.ratio.value = 20.0;
    limiterNode.attack.value = 0.001;
    limiterNode.release.value = 0.1;
    limiterNode.connect(audioCtx.destination);

    const audioPlayer = document.getElementById('audioPlayer');
    if (!mediaSource) {
        mediaSource = audioCtx.createMediaElementSource(audioPlayer);
        mediaSource.connect(preampNode);
    }

    sineOsc = audioCtx.createOscillator();
    sineGain = audioCtx.createGain();
    sineGain.gain.value = 0;
    sineOsc.connect(sineGain);
    sineOsc.start();

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
        b6 = white * 0.115926;
    }
    noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0;
    noiseSource.connect(noiseGain);
    noiseSource.start();

    sineGain.connect(preampNode);
    noiseGain.connect(preampNode);
    updateRouting();
}

document.getElementById('audioFileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = URL.createObjectURL(file);
        initAudio();
    }
});

document.getElementById('audioPlayer').addEventListener('play', function () {
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});

class PEQFilter {
    constructor(type = 'peaking', freq = 440, gain = 0, q = 3.0, active = true) {
        this.id = filterIdCounter++;
        this.active = active;
        this.type = type;
        this.freq = freq;
        this.gain = gain;
        this.q = q;
        this.node = null;
        if (audioCtx) this.initNode();
    }

    initNode() {
        this.node = audioCtx.createBiquadFilter();
        this.apply(true);
    }

    apply(immediate = false) {
        if (!this.node) return;
        this.node.type = this.type;

        if (immediate || (audioCtx && audioCtx.state === 'suspended')) {
            this.node.frequency.value = this.freq;
            this.node.gain.value = this.gain;
            this.node.Q.value = this.q;
        } else {
            const t = audioCtx.currentTime;
            this.node.frequency.setTargetAtTime(this.freq, t, 0.01);
            this.node.gain.setTargetAtTime(this.gain, t, 0.01);
            this.node.Q.setTargetAtTime(this.q, t, 0.01);
        }
    }
}

function addFilter(type, freq, gain, q) {
    initAudio();
    filters.push(new PEQFilter(type, freq, gain, q));
    renderFilters();
    updateRouting();
    setTimeout(updateGraph, 50);
}

function addFilterAtSineFreq() {
    const freqVal = Math.max(10, Math.min(20000, parseFloat(document.getElementById('sineFreqInput').value) || 440));
    addFilter('peaking', freqVal, 0, 3.0);
}

function addBassBoost() {
    addFilter('lowshelf', 105, 3.0, 0.71);
}

function addTrebleBoost() {
    addFilter('highshelf', 3000, 2.0, 0.71);
}

function resetAllFilters() {
    if (filters.length === 0) return;
    if (confirm(i18n[currentLang].reset_confirm)) {
        filters.forEach(f => {
            if (f.node) f.node.disconnect();
        });
        filters.length = 0;
        renderFilters();
        updateRouting();
        setTimeout(updateGraph, 50);
    }
}

function importAPO(event) {
    const file = event.target.files[0];
    if (!file) return;
    initAudio();

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.split('\n');
        const newFilters = [];
        const filterRegex = /Filter(?:\s*\d+)?:\s*(?:ON\s*)?(PK|LSC|LS|HSC|HS)\s*Fc\s*([\d.]+)\s*Hz\s*Gain\s*([\d.-]+)\s*dB\s*Q\s*([\d.]+)/i;
        lines.forEach(line => {
            const match = line.match(filterRegex);
            if (match) {
                const active = !line.trim().startsWith('#');
                const typeMap = {
                    'PK': 'peaking',
                    'LSC': 'lowshelf',
                    'LS': 'lowshelf',
                    'HSC': 'highshelf',
                    'HS': 'highshelf'
                };
                newFilters.push(new PEQFilter(typeMap[match[1].toUpperCase()] || 'peaking', parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4]), active));
            }
        });

        if (newFilters.length > 0) {
            filters.forEach(f => {
                if (f.node) f.node.disconnect();
            });
            filters.length = 0;
            filters.push(...newFilters);
            renderFilters();
            setTimeout(() => {
                updateRouting();
                updateGraph();
            }, 50);
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

function updateF(id, field, val) {
    const f = filters.find(x => x.id === id);
    if (!f) return;
    if (field === 'active') {
        f.active = val;
        updateRouting();
        return;
    }
    if (field === 'type') {
        f.type = val;
        f.q = (val === 'peaking') ? 3.0 : 0.7;
        renderFilters();
    }
    if (field === 'freq') f.freq = Math.max(10, Math.min(20000, parseFloat(val) || 10));
    if (field === 'gain') f.gain = parseFloat(val) || 0;
    if (field === 'q') f.q = Math.max(0, Math.min(20, parseFloat(val) || 0));

    f.apply();
    updateGraph();
    setTimeout(updateGraph, 50);
}

function removeF(id) {
    const idx = filters.findIndex(x => x.id === id);
    if (idx > -1) {
        if (filters[idx].node) filters[idx].node.disconnect();
        filters.splice(idx, 1);
        renderFilters();
        updateRouting();
    }
}

function updateRouting() {
    if (!audioCtx) return;
    preampNode.disconnect();
    filters.forEach(f => {
        if (f.node) f.node.disconnect();
    });

    let last = preampNode;
    if (eqEnabled) {
        filters.filter(f => f.active && f.node).forEach(f => {
            last.connect(f.node);
            last = f.node;
        });
    }
    last.connect(limiterNode);

    updateGraph();
    updateExportWarning();
}

function updateAudioPreamp() {
    if (!audioCtx) return;
    const lockPreamp = document.getElementById('preampLockToggle').checked;
    const vol = parseFloat(document.getElementById('masterVol').value);

    let peakLinear = Math.pow(10, currentMaxG / 20);
    let targetGain = 1.0;

    let expectedPeak = vol * peakLinear;
    if (expectedPeak > 1.0) {
        targetGain = 1.0 / expectedPeak;
    }

    if (!eqEnabled && !lockPreamp) {
        targetGain = 1.0;
    }

    if (audioCtx.state === 'suspended') {
        preampNode.gain.value = targetGain;
    } else {
        preampNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.02);
    }
}

function updateGraph() {
    const canvas = document.getElementById('eqGraph');
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const midY = h / 2;

    const isDark = document.body.classList.contains('dark-mode');
    const gridColor = isDark ? '#444' : '#eee';
    const textColor = isDark ? '#ccc' : '#666';

    ctx.font = '12px "Segoe UI", sans-serif';

    // Hz
    ctx.textAlign = 'center';
    const hzLabels = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
    hzLabels.forEach(hz => {
        const x = w * (Math.log(hz / 10) / Math.log(20000 / 10));
        ctx.beginPath();
        ctx.strokeStyle = gridColor;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.fillText(hz >= 1000 ? (hz / 1000) + 'k' : hz, x, h - 8);
    });

    // dB
    ctx.textAlign = 'left';
    const dbLabels = [-15, -10, -5, 0, 5, 10, 15];
    dbLabels.forEach(db => {
        const y = midY - (db * (h / 40));
        ctx.beginPath();
        ctx.strokeStyle = db === 0 ? (isDark ? '#666' : '#ccc') : gridColor;
        ctx.lineWidth = db === 0 ? 2 : 1;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.fillText((db > 0 ? '+' : '') + db + ' dB', 8, y - 4);
    });

    if (!audioCtx) return;

    const freqs = new Float32Array(w);
    for (let i = 0; i < w; i++) freqs[i] = 10 * Math.pow(20000 / 10, i / w);

    const totalMag = new Float32Array(w).fill(1.0);
    filters.filter(f => f.active && f.node).forEach(f => {
        const mag = new Float32Array(w), phase = new Float32Array(w);
        f.node.getFrequencyResponse(freqs, mag, phase);
        for (let i = 0; i < w; i++) totalMag[i] *= mag[i];
    });

    let maxG = 0;
    for (let i = 0; i < w; i++) {
        const db = 20 * Math.log10(totalMag[i] || 1e-6);
        if (db > maxG) maxG = db;
    }

    currentMaxG = maxG;
    exportPreampDb = maxG > 0 ? -maxG : 0;
    document.getElementById('preampDisplay').innerText = exportPreampDb.toFixed(2);

    updateAudioPreamp();

    const lockPreamp = document.getElementById('preampLockToggle').checked;
    const showPreampLine = eqEnabled || lockPreamp;

    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < w; i++) {
        let db = 20 * Math.log10(totalMag[i] || 1e-6);
        if (!eqEnabled) db = 0;
        const finalDb = db + (showPreampLine ? exportPreampDb : 0);
        const y = midY - (finalDb * (h / 40));
        if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
    }
    ctx.stroke();
}

function toggleSine() {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    isSinePlaying = !isSinePlaying;
    const vol = parseFloat(document.getElementById('masterVol').value);

    if (audioCtx.state === 'suspended') {
        sineGain.gain.value = isSinePlaying ? vol : 0;
    } else {
        sineGain.gain.setTargetAtTime(isSinePlaying ? vol : 0, audioCtx.currentTime, 0.05);
    }

    document.getElementById('btnSine').innerText = isSinePlaying ? i18n[currentLang].btn_stop_sine : i18n[currentLang].btn_start_sine;
    if (!isSinePlaying && currentSweepDir !== 0) stopSweep();
}

function toggleNoise() {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    isNoisePlaying = !isNoisePlaying;
    const vol = parseFloat(document.getElementById('masterVol').value);

    if (audioCtx.state === 'suspended') {
        noiseGain.gain.value = isNoisePlaying ? vol : 0;
    } else {
        noiseGain.gain.setTargetAtTime(isNoisePlaying ? vol : 0, audioCtx.currentTime, 0.05);
    }

    document.getElementById('btnNoise').innerText = isNoisePlaying ? i18n[currentLang].btn_stop_noise : i18n[currentLang].btn_start_noise;
}

function toggleSweep(dir) {
    initAudio();
    if (!isSinePlaying) {
        toggleSine();
    }

    if (currentSweepDir === dir) {
        stopSweep();
    } else {
        currentSweepDir = dir;
        document.getElementById('btnSweepUp').innerText = dir === 1 ? i18n[currentLang].btn_stop_sweep : i18n[currentLang].btn_sweep_up;
        document.getElementById('btnSweepDown').innerText = dir === -1 ? i18n[currentLang].btn_stop_sweep : i18n[currentLang].btn_sweep_down;

        currentSweepFreq = parseFloat(document.getElementById('sineFreqInput').value) || 440;

        if (!sweepAnimFrame) {
            doSweep();
        }
    }
}

function stopSweep() {
    currentSweepDir = 0;
    cancelAnimationFrame(sweepAnimFrame);
    sweepAnimFrame = null;
    document.getElementById('btnSweepUp').innerText = i18n[currentLang].btn_sweep_up;
    document.getElementById('btnSweepDown').innerText = i18n[currentLang].btn_sweep_down;
}

function doSweep() {
    if (currentSweepDir === 0) return;

    let multiplier = parseFloat(document.getElementById('sweepSpeed').value);

    if (currentSweepDir === 1) { // Up
        currentSweepFreq *= multiplier;
        if (currentSweepFreq >= 20000) {
            currentSweepFreq = 20000;
            stopSweep();
        }
    } else { // Down
        currentSweepFreq /= multiplier;
        if (currentSweepFreq <= 10) {
            currentSweepFreq = 10;
            stopSweep();
        }
    }

    document.getElementById('sineFreqInput').value = Math.round(currentSweepFreq);
    document.getElementById('sineFreqSlider').value = 100 * (Math.log(currentSweepFreq / 10) / Math.log(20000 / 10));

    if (sineOsc) sineOsc.frequency.setTargetAtTime(currentSweepFreq, audioCtx.currentTime, 0.02);

    if (currentSweepDir !== 0) {
        sweepAnimFrame = requestAnimationFrame(doSweep);
    }
}

const masterVolSlider = document.getElementById('masterVol');
const audioPlayer = document.getElementById('audioPlayer');

function applyVolumeChanges(v) {
    document.getElementById('volLabel').innerText = Math.round(v * 100) + '%';
    if (audioCtx) {
        if (isSinePlaying) sineGain.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05);
        if (isNoisePlaying) noiseGain.gain.setTargetAtTime(v, audioCtx.currentTime, 0.05);
        updateAudioPreamp();
    }
}

masterVolSlider.addEventListener('input', e => {
    const v = parseFloat(e.target.value);
    applyVolumeChanges(v);
    // Player-Lautstärke mitziehen, falls sie abweicht
    if (Math.abs(audioPlayer.volume - v) > 0.01) {
        audioPlayer.volume = v;
    }
});

audioPlayer.addEventListener('volumechange', () => {
    const v = audioPlayer.volume;
    if (Math.abs(parseFloat(masterVolSlider.value) - v) > 0.01) {
        masterVolSlider.value = v;
        applyVolumeChanges(v);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    audioPlayer.volume = parseFloat(masterVolSlider.value);
});

const sSlider = document.getElementById('sineFreqSlider');
const sInput = document.getElementById('sineFreqInput');

sSlider.addEventListener('input', e => {
    const f = 10 * Math.pow(20000 / 10, e.target.value / 100);
    sInput.value = Math.round(f);
    if (sineOsc) sineOsc.frequency.setTargetAtTime(f, audioCtx.currentTime, 0.05);
    if (currentSweepDir !== 0) stopSweep();
});

sInput.addEventListener('input', e => {
    const f = Math.max(10, Math.min(20000, parseFloat(e.target.value) || 10));
    sSlider.value = 100 * (Math.log(f / 10) / Math.log(20000 / 10));
    if (sineOsc) sineOsc.frequency.setTargetAtTime(f, audioCtx.currentTime, 0.05);
    if (currentSweepDir !== 0) stopSweep();
});

document.addEventListener('wheel', function (e) {
    if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'number') {
        e.preventDefault();
        const el = document.activeElement;
        const step = parseFloat(el.step) || 1;
        const dir = e.deltaY < 0 ? 1 : -1;
        let val = (parseFloat(el.value) || 0) + (step * dir);
        if (el.hasAttribute('min')) val = Math.max(parseFloat(el.min), val);
        if (el.hasAttribute('max')) val = Math.min(parseFloat(el.max), val);
        const decimals = (step.toString().split('.')[1] || []).length;
        el.value = val.toFixed(decimals);
        el.dispatchEvent(new Event('input'));
    }
}, {passive: false});

function renderFilters() {
    const container = document.getElementById('filtersContainer');
    const t = i18n[currentLang];
    container.innerHTML = '';
    filters.forEach(f => {
        const div = document.createElement('div');
        div.className = 'filter-row';
        //if (!f.active) div.style.opacity = '0.5';
        const qDisabled = (f.type === 'lowshelf' || f.type === 'highshelf');
        div.innerHTML = `
                <div class="toggle-item" style="flex-direction:column; align-items:start;">
                    <label>${t.f_active}</label>
                    <input type="checkbox" ${f.active ? 'checked' : ''} onchange="updateF(${f.id}, 'active', this.checked)">
                </div>
                <div>
                    <label>${t.f_type}</label>
                    <select onchange="updateF(${f.id}, 'type', this.value)">
                        <option value="peaking" ${f.type === 'peaking' ? 'selected' : ''}>${t.type_pk}</option>
                        <option value="lowshelf" ${f.type === 'lowshelf' ? 'selected' : ''}>${t.type_ls}</option>
                        <option value="highshelf" ${f.type === 'highshelf' ? 'selected' : ''}>${t.type_hs}</option>
                    </select>
                </div>
                <div>
                    <label>${t.f_freq}</label>
                    <input type="number" value="${f.freq}" min="10" max="20000" step="5" oninput="updateF(${f.id}, 'freq', this.value)">
                </div>
                <div>
                    <label>${t.f_gain}</label>
                    <input type="number" value="${f.gain}" step="0.1" oninput="updateF(${f.id}, 'gain', this.value)">
                </div>
                <div>
                    <label>${t.f_q}</label>
                    <input type="number" value="${f.q}" min="0" max="20" step="0.05" ${qDisabled ? 'disabled' : ''} oninput="updateF(${f.id}, 'q', this.value)">
                </div>
                <button class="danger" onclick="removeF(${f.id})">${t.f_remove}</button>
            `;
        container.appendChild(div);
    });
}

function toggleMasterEQ() {
    eqEnabled = document.getElementById('eqToggle').checked;
    updateRouting();
}


function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    const iconEl = document.getElementById('themeIcon');
    const checkbox = document.getElementById('darkModeToggle');
    iconEl.innerText = isDark ? '🌙' : '☀️';
    if (checkbox) checkbox.checked = isDark;

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDarkSystem = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && isDarkSystem);

    if (shouldBeDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').innerText = '🌙';
        if (document.getElementById('darkModeToggle')) document.getElementById('darkModeToggle').checked = true;
    }
}

function toggleInfoSection() {
    const infoSec = document.getElementById('infoSection');
    const showBtn = document.getElementById('showInfoBtn');

    if (infoSec.style.display === 'none') {
        infoSec.style.display = 'block';
        showBtn.style.display = 'none';
        sessionStorage.setItem('infoClosed', 'false');
    } else {
        infoSec.style.display = 'none';
        showBtn.style.display = 'inline-block';
        sessionStorage.setItem('infoClosed', 'true');
    }
}

function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    const eqParam = params.get('eq');

    if (eqParam) {
        const filterStrings = eqParam.split('~');
        filters.forEach(f => {
            if (f.node) f.node.disconnect();
        });
        filters.length = 0;

        filterStrings.forEach(fs => {
            const parts = fs.split(',');
            if (parts.length === 5) {
                const typeMap = {'p': 'peaking', 'l': 'lowshelf', 'h': 'highshelf'};
                const type = typeMap[parts[0]] || 'peaking';
                const freq = parseFloat(parts[1]);
                const gain = parseFloat(parts[2]);
                const q = parseFloat(parts[3]);
                const active = parts[4] === '1';

                if (!isNaN(freq) && !isNaN(gain) && !isNaN(q)) {
                    filters.push(new PEQFilter(type, freq, gain, q, active));
                }
            }
        });

        if (filters.length > 0) {
            renderFilters();
            updateRouting();
            setTimeout(updateGraph, 50);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const isClosed = sessionStorage.getItem('infoClosed') === 'true';
    const infoSec = document.getElementById('infoSection');
    const showBtn = document.getElementById('showInfoBtn');

    initTheme();
    changeLang(currentLang);

    if (isClosed) {
        infoSec.style.display = 'none';
        showBtn.style.display = 'inline-block';
    } else {
        infoSec.style.display = 'block';
        showBtn.style.display = 'none';
    }

    checkUrlParams();
});

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('eq') && params.get('eq').trim() !== "") {
        document.getElementById('filterModal').style.display = 'flex';
    } else {
        updateGraph();
    }
}

function handleModal(confirmed) {
    document.getElementById('filterModal').style.display = 'none';
    initAudio();
    if (confirmed) {
        loadFiltersFromURL();
        console.log("Filter aus URL wurden aktiviert.");
    } else {
        // Entferne die Parameter, falls das Preset nicht geladen wurde
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    updateRouting();
    updateGraph();
}
