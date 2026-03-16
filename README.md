# 🎧 Headphone Tuner (PEQ Pro)

## [Directly to the English version](#english-version)
Übersetze die Beschreibung auf Englisch. Behalte die Inhalte bei, aber Schreibe Sätze bei Bedarf so um, dass sie möglichst natürlich klingen.

> ### ⚠️ Sicherheitshinweis
> Die Verwendung von Sinustönen und EQ-Boosts bei hohen Lautstärken kann dein **Gehör schädigen** und deine **Hardware (Treiber) überlasten**. Beginne immer bei niedriger Lautstärke und gehe vorsichtig vor.

---

## Projektbeschreibung & Anleitung
### Verwendung
Der Headphone Tuner kann mit folgendem Link direkt aufgerufen werden:
### [➜ Headphone Tuner öffnen](./index.html)
Bitte darauf achten, dass bei Verwendung des Tools keine Filter eines laufenden Equalizers wie EqualizerAPO aktiv sind, da diese sonst die Ergebnisse verfälschen - außer natürlich, das Tuning wird direkt im externen EQ durchgeführt und die Filter des Tools werden gar nicht verwendet.

### Kernfunktionen und Durchführung des Tunings
* **Sinus-Generator und Filter-Erzeugung:** Der Sinus-Generator Erzeugt eine reine Wellenform mit einstellbarer Frequenz, mit der schmalbandige Resonanzen (Peaks) oder Auslöschungen (Dips) aufgespürt werden können.
    * Die Sweep-Funktion erlaubt ein automatisches Durchlaufen der Frequenzen in 3 Geschwindigkeiten, ausgehend von der aktuell gesetzten Frequenz in die gewünschte Richtung.
    * Ein neuer Filter wird automatisch an der aktuellen Stelle des Sinus-Generators gesetzt, um Pegelunterschiede sofort ausgleichen zu können. Finde also den Mittelpunkt und setze einen Filter.
    * Der Q-Faktor bestimmt die Bandbreite eines Filters.
        * *Faustregel:* Hoher Q-Faktor (z.B. 4.0 - 8.0) für schmale Spitzen; niedriger Q-Faktor (z.B. 0.7 - 1.4) für breite Korrekturen.
* **Audio Player:** Der Audio-Player ermöglicht dir, die Filter direkt mit deiner eigenen Musik zu testen. Es werden alle gängigen Audio-Formate unterstützt. 
* **Pink Noise Generator:** Ein Rauschen mit konstantem Energiegehalt pro Oktave, ideal um die tonale Gesamtbalance zu beurteilen. 
    * Kein Frequenzbereich sollte "herausstechen" oder "verschwinden". 
    * Mit dem Pink Noise kann die Amplitude (Gain) des Filters so bestimmt werden, dass sich dieser Bereich optimal ins Gesamtbild einfügt. Dazu empfehle ich, den Wert der Amplitude manuell rauf- und runterzusetzen und dabei zu hören, welche Auswirkungen das auf den Klang des Rauschens hat, um so die ideale Amplitude herauszufinden.
* **Filter-Arten:** Das Tool erlaubt die Verwendung von Filtern der Arten Peak, High-Shelf und Low-Shelf, was die gängigsten Filter-Typen sind und für die Alltagsnutzung in der Regel ausreicht.
    * *Hinweis:* Eine Unterscheidung des linken und rechten Kanals (zum Ausgleich von Kanalungleichheiten) ist aktuell nicht möglich.
    * Mit Extra-Buttons kann ein simpler Bass- bzw. Höhen-Boost hinzugefügt werden, durch Reduzierung der Amplitude ins negative ist natürlich auch eine Abschwächung der Bässe bzw. Höhen möglich.
* **Mausrad-Steuerung:** Klicke ein Eingabefeld (Frequenz, Gain, Q) an und nutze das Mausrad für präzise Justierungen in Echtzeit. Klicke eine andere Stelle der Seite an, um den Fokus auf das Textfeld wieder zu entfernen.
* **Smart Preamp:** Das Tool nutzt den verfügbaren Headroom. Ein Boost führt nicht sofort zum "Leisermachen" des Signals (Ducking), es sei denn, es droht Clipping – dann greift der unsichtbare **Limiter** ein.
    * Der benötigte Preamp-Wert wird automatisch in den Export geschrieben.
    * Tipp: Um einen A/B-Vergleich in EqualizerAPO durchzuführen, den Preamp im Preset deaktivieren und innerhalb der config.txt setzen, wo auch das Preset eingebunden werden muss. Dann können mit einem Klick alle Filter aktiviert bzw. deaktiviert werden, ohne die wahrgenommene Lautstärke zu sehr zu verändern.
* **Visualisierung:** Eine Echtzeit-Kurve zeigt den kombinierten Frequenzgang aller aktiven Filter inklusive des benötigten Preamps.
* **Import von bestehenden Presets** Lade eine bestehende Konfiguration in das Tool, um diese zu optimieren oder zu testen. Hierzu empfehle ich beispielsweise die Presets von oratory1990 (dazu unten mehr). Das Tool erwartet eine `.txt`-Datei im Format für EqualizerAPO. 
    * Achtung: Beachte die Einschränkungen der Filter-Typen, es können nicht alle in EqualizerAPO möglichen Filterarten verwendet werden.
    * Tipp: Implizit ist das Tool dazu in der Lage, EqualizerAPO-Presets für die Verwendung im Poweramp Equalizer umzuwandeln.

### Zusammenfassung der Schritte
1.  **Suchen:** Scanne mit dem Sinus-Generator das Frequenzband ab.
2.  **Fixieren:** Wenn du eine störende Resonanz hörst, füge an der Stelle einen Filter hinzu, um diese auszugleichen.
3.  **Prüfen:** Nutze Pink Noise für das Feintuning der Filter-Pegel und um zu hören, ob der Kopfhörer nun natürlich und ausgeglichen klingt.
4.  **Optimieren:** Sinus und Pink Noise sind das eine - Musik hören das andere. Du kannst den Audio-Player verwenden, um die Filter direkt mit deiner eigenen Musik zu testen.
5.  **Exportieren:** Speichere das Ergebnis als `.txt` (EqualizerAPO) oder `.json` (Poweramp Equalizer) und importiere die Datei in das entsprechende Programm, um deine Konfiguration anzuwenden und deinen Sound in einer neuen Qualität zu genießen.

## Beziehen von Presets
Das Tuning eines Kopfhörers per Gehör von Grund auf ist nicht leicht, gerade wenn hier noch keine Erfahrungen gesammelt wurden. Ein PEQ erlaubt nicht nur das entzerren von Resonanzen, sondern bietet auch die Möglichkeit, die Klang-Charakteristik des Kopfhörers maßgeblich zu beeinflussen. In vielen Kopfhörern steckt Potential, das hiermit erst richtig entfesselt werden kann. Aber, damit das funktioniert empfiehlt es sich, ein Preset zu beziehen, das auf einer Messung basiert.

Hierzu gibt es im wesentlichen zwei Möglichkeiten: 
### AutoEQ (größte Auswahl, sehr einfach)
https://autoeq.app/

Vorgehensweise:
1. Kopfhörer auswählen
2. Select equalizer App -> EqualizerAPO ParametricEq
3. Datei herunterladen und in den Headphone Tuner importieren

### oratory1990 (meine Empfehlung, aber mehr Aufwand)
https://www.reddit.com/r/oratory1990/wiki/index/list_of_presets/

Vorgehensweise:
* Kopfhörer in der Liste suchen (meistens passt die Standard-Variante) und die PDF-Datei herunterladen
* Filter aus der Tabelle in den Headphone Tuner eintragen (Handarbeit)
* Alternative: Mit Hilfe eines Chatbots wie Gemini die Tabelle in ein EqualizerAPO-Preset umwandeln, PDF anhängen und Prompt eingeben, folgender Prompt-Vorschlag gibt Informationen zum Aufbau der Datei mit, überprüfen der Werte nicht vergessen:
```
Create a .txt file for import into EqualizerAPO using the table in the lower-left corner of the attached PDF file. Please convert Bandwidth (BW) to Q-Factor if necessary (Q ≈ 1.41 / BW).
Each filter should be represented by a new line line with the following format:
	Filter: ON [TYPE] Fc [FREQUENCY] Hz Gain [GAIN] dB Q [Q-FACTOR]
	Where [TYPE] can be LSC (Low-Shelf), PK (Peak), or HSC (High-Shelf). The 'ON' must always be present.
Example:
Preamp: -8.5 dB
Filter: ON LSC Fc 105 Hz Gain 4 dB Q 0.71
Filter: ON PK Fc 1000 Hz Gain 2 dB Q 5.2
Filter: ON HSC Fc 5000 Hz Gain -3 dB Q 0.71
```
Anschließend in eine `.txt` speichern und in den Headphone Tuner importieren.

### Warum muss ich das Preset noch bearbeiten?
Nachdem das Preset erfolgreich geladen wurde sollte sich mit dem Rosa Rauschen bereits eine Verbesserung feststellen lassen. Aber - es nicht noch nicht perfekt. Gerade im Hochton-Bereich wird der Klang sehr individuell und die Messungen, die den Filtern zu Grunde liegen, sind aufgrund physikalischer Begebenheiten nicht mehr akkurat. Hier kommt es also auf die Kombination aus deinem Gehör und deinen Kopfhörern an - diese Tatsache ist der Grund, warum ich das Tool und die Vorgehensweise entwickelt habe.

Empfehlung: Gerade schmalere Filter (hoher Q-Faktor) in Bereichen über 3kHz können oft einfach gelöscht und durch eigene ersetzt werden. Das Tool bietet alle Möglichkeiten, die es braucht, um hier die passenden Filter zu finden. Breitere Filter die einen größeren Frequenzbereich abdecken können in der Regel erhalten bleiben, da es hier eher um die Klangfarbe geht. Aber gerade im Bass- und Mitteltonbereich sind die Presets oft akkurat und hilfreich, den Klang der Kopfhörer mit wenig Aufwand zu verbessern.

## Abschluss
Das waren die wichtigsten Informationen darüber, wie dieses Tool zu verwenden ist und wozu es da ist. Solltest du weitere Hilfe benötigen findest du diese sicherlich in einem Forum deiner Wahl, wo sich genug Audio-Enthusiasten tummeln. Und nun viel Spaß dabei, in ein neues Klangerlebnis einzutauchen.

---

---
## English version

### ⚠️ Safety Warning
Using sine tones and EQ boosts at high volumes can **damage your hearing** and **overload your hardware (drivers)**. Always start at low volume and proceed with caution.

---

## Project Description & Instructions
### How to Use
The Headphone Tuner can be accessed directly via the following link:
### [➜ Open Headphone Tuner](./index.html)
Please ensure that no filters from an active equalizer like EqualizerAPO are running while using the tool, as they will otherwise distort the results—unless, of course, you are performing the tuning directly in the external EQ and not using the tool's filters at all.

### Core Functions & Tuning Process
* **Sine Generator & Filter Creation:** The sine generator produces a pure waveform at an adjustable frequency, which you can use to pinpoint narrow-band resonances (peaks) or cancellations (dips).
    * The sweep function allows you to automatically cycle through frequencies at 3 different speeds, starting from the currently set frequency and moving in the desired direction.
    * A new filter is automatically placed at the current position of the sine generator, allowing you to immediately compensate for level differences. Find the center point and set a filter there.
    * The Q-factor determines the bandwidth of a filter.
        * *Rule of thumb:* A high Q-factor (e.g., 4.0 - 8.0) for narrow peaks; a low Q-factor (e.g., 0.7 - 1.4) for broader corrections.
* **Audio Player:** The audio player lets you test the filters directly with your own music. All common audio formats are supported.
* **Pink Noise Generator:** A noise with constant energy per octave, ideal for evaluating the overall tonal balance.
    * No frequency range should "stand out" or "disappear."
    * Use pink noise to determine the amplitude (gain) of a filter so it blends optimally into the overall picture. I recommend manually adjusting the amplitude value up and down, listening to how it affects the sound of the noise, to find the ideal setting.
* **Filter Types:** The tool supports the filter types Peak, High-Shelf, and Low-Shelf, which are the most common types and usually sufficient for everyday use.
    * *Note:* Differentiating between left and right channels (to correct channel imbalances) is currently not possible.
    * Extra buttons allow you to add a simple bass or treble boost. By reducing the amplitude into the negative range, you can of course also attenuate the bass or treble.
* **Mouse Wheel Control:** Click on an input field (Frequency, Gain, Q) and use the mouse wheel for precise real-time adjustments. Click elsewhere on the page to remove focus from the text field.
* **Smart Preamp:** The tool utilizes the available headroom. A boost does not immediately lead to "ducking" (turning down the signal) unless clipping is imminent—in which case the invisible **limiter** engages.
    * The required preamp value is automatically written into the export.
    * Tip: To perform an A/B comparison in EqualizerAPO, disable the preamp in the preset and set it in the `config.txt` file where the preset is also loaded. This allows you to enable or disable all filters with a single click without significantly altering the perceived volume.
* **Visualization:** A real-time curve displays the combined frequency response of all active filters, including the required preamp.
* **Import Existing Presets:** Load an existing configuration into the tool to optimize or test it. I recommend, for example, using presets from oratory1990 (more on that below). The tool expects a `.txt` file in the EqualizerAPO format.
    * Caution: Be mindful of the filter type limitations; not all filter types possible in EqualizerAPO are supported.
    * Tip: Implicitly, the tool is capable of converting EqualizerAPO presets for use in the Poweramp Equalizer.

### Summary of Steps
1.  **Search:** Scan the frequency band with the sine generator.
2.  **Fix:** When you hear a disturbing resonance, add a filter at that point to correct it.
3.  **Check:** Use pink noise for fine-tuning the filter levels and to listen if the headphone now sounds natural and balanced.
4.  **Optimize:** Sine and pink noise are one thing—listening to music is another. You can use the audio player to test the filters directly with your own music.
5.  **Export:** Save the result as a `.txt` (EqualizerAPO) or `.json` (Poweramp Equalizer) file and import it into the corresponding program to apply your configuration and enjoy your sound in a new quality.

## Obtaining Presets
Tuning a headphone by ear from scratch is not easy, especially without prior experience. A PEQ not only allows for correcting resonances but also offers the ability to significantly influence the headphone's sound signature. Many headphones hold potential that can be truly unleashed this way. However, for this to work, it is recommended to start with a preset based on measurements.

There are essentially two main sources for this:
### AutoEQ (Largest Selection, Very Simple)
https://autoeq.app/

Procedure:
1. Select your headphone.
2. Select equalizer app -> EqualizerAPO ParametricEq.
3. Download the file and import it into the Headphone Tuner.

### oratory1990 (My Recommendation, but More Effort)
https://www.reddit.com/r/oratory1990/wiki/index/list_of_presets/

Procedure:
* Find your headphone in the list (the standard version usually fits) and download the PDF file.
* Enter the filters from the table into the Headphone Tuner manually.
* Alternative: Use a chatbot like Gemini to convert the table into an EqualizerAPO preset. Attach the PDF and use a prompt like the following suggestion, which provides information on the file structure. Remember to verify the values:
```
Create a .txt file for import into EqualizerAPO using the table in the lower-left corner of the attached PDF file. Please convert Bandwidth (BW) to Q-Factor if necessary (Q ≈ 1.41 / BW).
Each filter should be represented by a new line line with the following format:
	Filter: ON [TYPE] Fc [FREQUENCY] Hz Gain [GAIN] dB Q [Q-FACTOR]
	Where [TYPE] can be LSC (Low-Shelf), PK (Peak), or HSC (High-Shelf). The 'ON' must always be present.
Example:
Preamp: -8.5 dB
Filter: ON LSC Fc 105 Hz Gain 4 dB Q 0.71
Filter: ON PK Fc 1000 Hz Gain 2 dB Q 5.2
Filter: ON HSC Fc 5000 Hz Gain -3 dB Q 0.71
```
Then save it as a `.txt` file and import it into the Headphone Tuner.

### Why Do I Still Need to Edit the Preset?
After successfully loading the preset, you should already notice an improvement with pink noise. But it's not perfect yet. Especially in the treble range, sound is very individual, and the measurements underlying the filters become less accurate due to physical constraints. This is where the combination of your hearing and your specific headphones matters—this fact is the reason I developed this tool and methodology.

Recommendation: Narrower filters (high Q-factor) in ranges above 3kHz can often simply be deleted and replaced with your own. The tool provides all the capabilities needed to find the appropriate filters here. Broader filters that cover a larger frequency range can generally be kept, as they primarily affect overall tone color. But especially in the bass and mid-range, presets are often accurate and helpful for improving the sound of your headphones with minimal effort.

## Closing
Those were the most important details on how to use this tool and what it's for. Should you need further help, you'll certainly find it in a forum of your choice, where plenty of audio enthusiasts gather. Now, have fun diving into a new sound experience.