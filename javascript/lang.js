const i18n = {
    de: {
        title: "Kopfhörer Tuner (PEQ Pro)",
        lang_label: "Sprache",
        instructions: "Dieses Werkzeug dient zur präzisen Korrektur von Kopfhörer-Frequenzgängen mittels parametrischer Equalizer (PEQ).\n" +
            "• Sinus-Generator: Nutze den variablen Ton, um schmalbandige Resonanzen (Peaks) oder Auslöschungen (Dips) aufzuspüren. Ein Peak sticht durch plötzliche Lautstärkezunahme hervor, ein Dip durch ein deutliches 'Loch'.\n" +
            "• Die Sweep-Funktion fährt in 3 verschiedenen Geschwindigkeiten in wählbarer Richtung ausgehend von der aktuellen Frequenz durch das Frequenzband und hilft so beim Vergleich der Lautstärken.\n" +
            "• Füge an der Stelle einer deutlichen Ausprägung einen Filter hinzu, um diese auszugleichen. Ein neuer Filter wird automatisch an der aktuellen Sinus-Generator-Frequenz gesetzt. Passe die Breite (Q-Faktor) entsprechend der Ausprägung an.\n" +
            "• Pink Noise: Verwende das Rauschen, um die tonale Gesamtbalance zu beurteilen. Ziel ist es, die Filter-Pegel so feinjustieren, dass kein Frequenzbereich (Bass, Mitten, Höhen) in der Gesamtheit über- oder unterrepräsentiert wirkt.\n" +
            "• Audio Player: Teste die Filter mit deiner eigenen Musik. Es werden alle gängigen Audioformate unterstützt.\n" +
            "• Smart Preamp: Solange deine Gesamtlautstärke es zulässt (Headroom), wird der Pegel beim Boosten nicht leiser (kein Ducking). Erst wenn Clipping droht, greift der Limiter automatisch ein.\n" +
            "• 'Preamp halten': Verhindert Lautstärkesprünge beim Ausschalten des Master EQ (Bypass) für faire A/B-Vergleiche.\n" +
            "• Import: Lade bestehende Konfigurationen im .txt-Format (Equalizer APO). Das Tool erkennt Frequenz, Gain und Q-Faktor automatisch.\n" +
            "• Export: Speichere deine Einstellungen für 'Equalizer APO' (.txt) zur Nutzung am PC oder als .json-Datei für 'Poweramp Equalizer' auf Android-Geräten.",
        sec_gen: "Sound Generatoren",
        sine_freq: "Sinus-Frequenz",
        btn_start_sine: "▶ Sinuswelle starten",
        btn_stop_sine: "⏸ Sinuswelle stoppen",
        btn_sweep_down: "⏪ Sweep Down",
        btn_sweep_up: "⏩ Sweep Up",
        btn_stop_sweep: "⏹ Sweep Stopp",
        opt_slow: "Langsam",
        opt_med: "Mittel",
        opt_fast: "Schnell",
        btn_start_noise: "▶ Pink Noise starten",
        btn_stop_noise: "⏸ Pink Noise stoppen",
        sec_filters: "Filter-Konfiguration",
        lock_preamp: "Preamp halten",
        master_eq: "Master EQ",
        btn_add_filter: "+ Filter hinzufügen",
        btn_bass: "+ Bass Boost",
        btn_treble: "+ Höhen Boost",
        btn_import: "📂 Import (.txt)",
        btn_reset: "🗑 Alle löschen",
        reset_confirm: "Möchtest du wirklich alle Filter löschen?",
        sec_vis: "Frequenzgang-Visualisierung",
        preamp_label: "Benötigter Export-Preamp",
        btn_export: "Equalizer APO Preset exportieren (.txt)",
        btn_export_pa: "Poweramp Preset exportieren (.json)",
        f_active: "Aktiv",
        f_type: "Typ",
        f_freq: "Frequenz (Hz)",
        f_gain: "Gain (dB)",
        f_q: "Q-Faktor",
        f_remove: "Löschen",
        type_pk: "Peak",
        type_ls: "Low Shelf",
        type_hs: "High Shelf",
        prompt_name: "Dateiname für Export (ohne Endung):",
        default_name: "eq_preset",
        warning_text: "⚠️ ACHTUNG: Hohe Lautstärken und extreme EQ-Einstellungen können Gehörschäden verursachen und deine Hardware beschädigen. Verwende dieses Tool mit Vorsicht, beginne immer bei niedriger Lautstärke und vermeide abruptes Erhöhen der Pegel!",
        github_link: "GitHub Repository",
        modal_title: "Filter-Preset gefunden",
        modal_desc: "Diese Seite wurde mit voreingestellten Filtern geladen. Möchtest du diese Filter übernehmen?",
        btn_yes: "Ja, Filter laden",
        btn_no: "Nein, verwerfen",
        btn_share: "Link teilen",
        share_link_label: "Link zum Teilen:",
        btn_copy: "Kopieren",
        no_filters: "Keine Filter zum Teilen vorhanden.",
        documentation: "Weitere Informationen in der Dokumentation",
        warning_modal_title: "Bitte das Gerät drehen",
        warning_modal_desc: "Der Bildschirm ist zu schmal, um das Tool zu verwenden. Drehe das Gerät in den horizontalen Modus, wenn möglich.",
        fractal_string_label: "Dein Fractal Scape String:",
        export_format_label: "Export-Format auswählen:",
        btn_export_action: "💾 Exportieren",
        export_no_filter_warning: "Keine (aktiven) Filter zum Exportieren gefunden.",
        warn_wavelet: "Hinweis: Da Wavelet intern einen festen 127-Band Grafik-Equalizer nutzt, können parametrische Werte (wie der exakte Q-Faktor) nicht 1:1 übernommen werden. Deine Kurve wird bestmöglich angenähert.",
        warn_fractal: "Hinweis: Das Fractal Scape unterstützt maximal 5 Filter.",
    },
    en: {
        title: "Headphone Tuner (PEQ Pro)",
        lang_label: "Language",
        instructions: "A tool for precise headphone frequency response correction using Parametric EQ (PEQ).\n" +
            "• Sine Generator: Use the variable tone to sweep for narrow resonances (peaks) or cancellations (dips). A peak stands out as a sudden increase in volume, while a dip feels like a 'hole' in the sound.\n" +
            "• The Sweep function scans across the frequency band in 3 different speeds and a selectable direction, starting from the current frequency, which helps in comparing volumes.\n" +
            "• Add a filter at the point where the peak or dip is loudest or quietest. A new filter will be automatically set to the current sine generator frequency. Adjust the bandwidth (Q-factor) according to the width of the peak or dip.\n" +
            "• Pink Noise: Use this to judge the overall tonal balance. Fine-tune your filter gains so that no frequency range (bass, mids, treble) feels over- or under-represented in the mix.\n" +
            "• Audio Player: Test the filters with your own music. All common audio-formats are supported.\n" +
            "• Smart Preamp: As long as your master volume allows (headroom), boosting frequencies won't duck the overall audio. A limiter automatically kicks in only to prevent clipping.\n" +
            "• Keep Preamp: Prevents volume jumps when bypassing the EQ, allowing for fair A/B comparisons.\n" +
            "• Import: Load existing configurations in .txt format (Equalizer APO). The tool automatically detects frequency, gain, and Q-factor.\n" +
            "• Export: Save your settings for 'Equalizer APO' (.txt) for PC use or as a .json file for 'Poweramp Equalizer' on Android devices.",
        sec_gen: "Sound Generators",
        sine_freq: "Sine Frequency",
        btn_start_sine: "▶ Start Sine Wave",
        btn_stop_sine: "⏸ Stop Sine Wave",
        btn_sweep_down: "⏪ Sweep Down",
        btn_sweep_up: "⏩ Sweep Up",
        btn_stop_sweep: "⏹ Stop Sweep",
        opt_slow: "Slow",
        opt_med: "Medium",
        opt_fast: "Fast",
        btn_start_noise: "▶ Start Pink Noise",
        btn_stop_noise: "⏸ Stop Pink Noise",
        sec_filters: "Filter Configuration",
        lock_preamp: "Keep Preamp",
        master_eq: "Master EQ",
        btn_add_filter: "+ Add Filter",
        btn_bass: "+ Bass Boost",
        btn_treble: "+ Treble Boost",
        btn_import: "📂 Import (.txt)",
        btn_reset: "🗑 Clear All",
        reset_confirm: "Are you sure you want to delete all filters?",
        sec_vis: "Frequency Response Visualization",
        preamp_label: "Required Export Preamp",
        btn_export: "Export Equalizer APO Preset (.txt)",
        btn_export_pa: "Export Poweramp Preset (.json)",
        f_active: "Active",
        f_type: "Type",
        f_freq: "Freq (Hz)",
        f_gain: "Gain (dB)",
        f_q: "Q-Factor",
        f_remove: "Remove",
        type_pk: "Peak",
        type_ls: "Low Shelf",
        type_hs: "High Shelf",
        prompt_name: "Filename for export (without extension):",
        default_name: "eq_preset",
        warning_text: "⚠️ WARNING: High volumes and extreme EQ settings can cause hearing loss and damage your hardware. Use this tool with caution, always start at low volumes, and avoid abrupt level increases!",
        github_link: "GitHub Repository",
        modal_title: "Filter Preset Found",
        modal_desc: "This page was loaded with preset filters. Would you like to apply these filters?",
        btn_yes: "Yes, load filters",
        btn_no: "No, discard",
        btn_share: "Share Link",
        share_link_label: "Link to share:",
        btn_copy: "Copy",
        no_filters: "No filters to share.",
        documentation: "Further information in the documentation",
        warning_modal_title: "Please rotate your device",
        warning_modal_desc: "The screen is too narrow to use this tool. Rotate the device into landscape mode if possible.",
        fractal_string_label: "Your Fractal Scape String:",
        export_format_label: "Select Export Format:",
        btn_export_action: "💾 Export",
        export_no_filter_warning: "No (active) filters available for export.",
        warn_wavelet: "Note: Because Wavelet internally uses a fixed 127-band graphic equalizer, parametric values (like exact Q-factors) cannot be transferred 1:1. Your curve will be approximated as closely as possible.",
        warn_fractal: "Note: The Fractal Scape supports a maximum of 5 filters.",
    }
};

const browserLang = navigator.language || navigator.userLanguage;
let currentLang = browserLang.startsWith('de') ? 'de' : 'en';

function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = lang;
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (i18n[lang][key]) el.innerText = i18n[lang][key];
    });
    document.getElementById('descText').innerText = i18n[lang].instructions;
    document.getElementById('btnSine').innerText = isSinePlaying ? i18n[lang].btn_stop_sine : i18n[lang].btn_start_sine;
    document.getElementById('btnNoise').innerText = isNoisePlaying ? i18n[lang].btn_stop_noise : i18n[lang].btn_start_noise;

    if (currentSweepDir === 1) document.getElementById('btnSweepUp').innerText = i18n[lang].btn_stop_sweep;
    if (currentSweepDir === -1) document.getElementById('btnSweepDown').innerText = i18n[lang].btn_stop_sweep;
    updateExportWarning();

    renderFilters();
}