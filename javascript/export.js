function exportAPO() {
    const name = prompt(i18n[currentLang].prompt_name, i18n[currentLang].default_name);
    if (name === null) return;

    let txt = `Preamp: ${exportPreampDb.toFixed(2)} dB\n`;
    filters.forEach(f => {
        const typeMap = {peaking: "PK", lowshelf: "LSC", highshelf: "HSC"};
        txt += `${f.active ? '' : '#'}Filter: ON ${typeMap[f.type]} Fc ${f.freq} Hz Gain ${f.gain} dB Q ${f.q}\n`;
    });
    const blob = new Blob([txt], {type: "text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name || 'eq_preset'}.txt`;
    a.click();
}

function exportWavelet() {
    const activeFilters = filters.filter(f => f.active);

    if (activeFilters.length === 0) {
        alert(i18n[currentLang].export_no_filter_warning);
        return;
    }

    // Wavelet needs exact these 127 bands
    const waveletFreqs = [
        20, 21, 22, 23, 24, 26, 27, 29, 30, 32, 34, 36, 38, 40, 43, 45, 48, 50, 53, 56, 59,
        63, 66, 70, 74, 78, 83, 87, 92, 97, 103, 109, 115, 121, 128, 136, 143, 151, 160, 169,
        178, 188, 199, 210, 222, 235, 248, 262, 277, 292, 309, 326, 345, 364, 385, 406, 429,
        453, 479, 506, 534, 565, 596, 630, 665, 703, 743, 784, 829, 875, 924, 977, 1032, 1090,
        1151, 1216, 1284, 1357, 1433, 1514, 1599, 1689, 1784, 1885, 1991, 2103, 2221, 2347,
        2479, 2618, 2766, 2921, 3086, 3260, 3443, 3637, 3842, 4058, 4287, 4528, 4783, 5052,
        5337, 5637, 5955, 6290, 6644, 7018, 7414, 7831, 8272, 8738, 9230, 9749, 10298, 10878,
        11490, 12137, 12821, 13543, 14305, 15110, 15961, 16860, 17809, 18812, 19871
    ];

    const points = waveletFreqs.length;
    const frequencies = new Float32Array(waveletFreqs);
    const totalGains = new Float32Array(points).fill(0);

    // Offline audio context for calculation
    const offlineCtx = new OfflineAudioContext(1, 1, 44100);

    activeFilters.forEach(f => {
        const biquad = offlineCtx.createBiquadFilter();

        biquad.type = f.type || 'peaking';
        biquad.frequency.value = f.freq;
        biquad.Q.value = f.q || 1.0;
        biquad.gain.value = f.gain;

        const magResponse = new Float32Array(points);
        const phaseResponse = new Float32Array(points);

        biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);

        for (let i = 0; i < points; i++) {
            const mag = magResponse[i];
            const db = mag > 0 ? 20 * Math.log10(mag) : -100;
            totalGains[i] += db;
        }
    });

    const waveletPairs = [];
    for (let i = 0; i < points; i++) {
        // Connect the fixed frequency to its gain
        waveletPairs.push(`${waveletFreqs[i]} ${totalGains[i].toFixed(1)}`);
    }

    const fileContent = "GraphicEQ: " + waveletPairs.join('; ');

    let filename = prompt(i18n[currentLang].prompt_name, i18n[currentLang].default_name);
    if (!filename) return;
    filename += ".txt";

    const blob = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportPoweramp() {
    const name = prompt(i18n[currentLang].prompt_name, i18n[currentLang].default_name);
    if (name === null) return;

    const paData = [{
        "name": name || "eq_preset",
        "preamp": parseFloat(exportPreampDb.toFixed(2)),
        "parametric": true,
        "bands": [
            {
                "type": 0,
                "channels": 0,
                "frequency": 90,
                "q": 0.800000011920929,
                "gain": 0.0,
                "color": 0
            },
            {
                "type": 1,
                "channels": 0,
                "frequency": 10000,
                "q": 0.6000000238418579,
                "gain": 0.0,
                "color": 0
            }
        ]
    }];

    filters.filter(f => f.active).forEach(f => {
        let pType = 2;
        if (f.type === 'lowshelf') pType = 0;
        if (f.type === 'highshelf') pType = 1;

        paData[0].bands.push({
            "type": pType,
            "channels": 0,
            "frequency": parseFloat(f.freq),
            "q": parseFloat(f.q),
            "gain": parseFloat(f.gain),
            "color": 0
        });
    });

    const blob = new Blob([JSON.stringify(paData, null, 4)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name || 'eq_preset'}.json`;
    a.click();
}

function exportFractalScape() {
    if (filters.length > 5) {
        return;
    }
    // Calculate required array size: 2 byte header + (15 bytes * Num Filters) + 1 byte checksum
    const buffer = new Uint8Array(2 + (filters.length * 15) + 1);
    const view = new DataView(buffer.buffer);

    // 1. Global Header
    buffer[0] = 0x01; // Global EQ Enabled
    buffer[1] = filters.length; // Number of filters

    // 2. Pack the Filters
    let offset = 2;
    for (const filter of filters) {
        // Map Filter Type to Byte
        let typeByte = 0; // Default to PK
        if (filter.type === 'lowshelf') typeByte = 1;
        else if (filter.type === 'highshelf') typeByte = 2;

        buffer[offset] = typeByte;

        // Gain (Float32, Little Endian)
        view.setFloat32(offset + 1, filter.gain, true);

        // Q-Factor (Float32, Little Endian)
        view.setFloat32(offset + 5, filter.q, true);

        // Frequency (Int32, Little Endian). Must be rounded to nearest whole number.
        view.setInt32(offset + 9, Math.round(filter.freq), true);

        // Padding bytes at offset + 13 and offset + 14 are left as 0x00 implicitly
        offset += 15;
    }

    // 3. XOR Checksum
    let checksum = 0;
    for (let i = 0; i < offset; i++) {
        checksum ^= buffer[i];
    }
    buffer[offset] = checksum;

    // 4. Convert Uint8Array to Base64 String
    let binaryStr = '';
    for (let i = 0; i < buffer.length; i++) {
        binaryStr += String.fromCharCode(buffer[i]);
    }

    // btoa() is native to browsers
    return btoa(binaryStr);
}

function updateExportWarning() {
    const exportType = document.getElementById('exportTypeSelect').value;
    const warningBox = document.getElementById('exportWarningBox');
    const exportButton = document.getElementById('exportButton');

    warningBox.style.display = 'none';
    warningBox.textContent = '';
    exportButton.disabled = false;

    if (exportType === 'wavelet') {
        warningBox.textContent = i18n[currentLang].warn_wavelet;
        warningBox.style.display = 'block';
    } else if (exportType === 'fractal' && filters.length > 5) {
        warningBox.textContent = i18n[currentLang].warn_fractal;
        warningBox.style.display = 'block';
        exportButton.disabled = true;
    }
}

function generateShareLink() {
    if (filters.length === 0) {
        alert(i18n[currentLang].no_filters);
        return;
    }

    const eqData = filters.map(f => {
        const t = f.type === 'peaking' ? 'p' : (f.type === 'lowshelf' ? 'l' : 'h');
        return `${t},${f.freq},${f.gain},${f.q},${f.active ? 1 : 0}`;
    }).join('~');

    const baseURL = "https://mm21development.github.io/headphonetuner/index.html";
    const shareURL = `${baseURL}?eq=${encodeURIComponent(eqData)}`;

    document.getElementById('shareBox').style.display = 'block';
    document.getElementById('shareLinkInput').value = shareURL;
}

function copyShareLink() {
    const input = document.getElementById('shareLinkInput');
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
        const btn = document.querySelector('#shareBox button');
        const originalText = btn.innerText;
        btn.innerText = "✓";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
}

function generateFractalString() {
    const fractalStr = exportFractalScape();
    if (!fractalStr) return;
    document.getElementById('shareBox').style.display = 'none';
    document.getElementById('fractalBox').style.display = 'block';
    document.getElementById('fractalStringInput').value = fractalStr;
}

function copyFractalString() {
    const input = document.getElementById('fractalStringInput');
    input.select();
    input.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(input.value).then(() => {
        const btn = document.querySelector('#fractalBox button');
        const originalText = btn.innerText;
        btn.innerText = "✓";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
}

function executeExport() {
    const exportType = document.getElementById('exportTypeSelect').value;

    document.getElementById('shareBox').style.display = 'none';
    const fractalBox = document.getElementById('fractalBox');
    if (fractalBox) fractalBox.style.display = 'none';

    if (exportType === 'apo') {
        exportAPO();
    } else if (exportType === 'poweramp') {
        exportPoweramp();
    } else if (exportType === 'fractal') {
        generateFractalString();
    } else if (exportType === 'wavelet') {
        exportWavelet();
    }
}