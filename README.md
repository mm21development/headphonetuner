# 🎧 Headphone Tuner (PEQ Pro)

## [Directly to the English version](#english-version)

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
    * Ein neuer Filter wird automatisch an der aktuellen Stelle des Sinus-Generators gesetzt, um Pegelunterschiede sofort ausgleichen zu können. Finde also den Mittelpunkt und setze einen Filter.
    * Der Q-Faktor bestimmt die Bandbreite eines Filters.
        * *Faustregel:* Hoher Q-Faktor (z.B. 4.0 - 8.0) für schmale Spitzen; niedriger Q-Faktor (z.B. 0.7 - 1.4) für breite Korrekturen.
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
2.  **Fixieren:** Wenn du eine störende Resonanz hörst, füge an dieser Stelle einen Filter hinzu, um diese auszugleichen.
3.  **Prüfen:** Nutze Pink Noise, um zu hören, ob der Kopfhörer nun natürlich und ausgeglichen klingt.
4.  **Exportieren:** Speichere das Ergebnis als `.txt` (EqualizerAPO) oder `.json` (Poweramp Equalizer) und importiere die Datei in das entsprechende Programm, um deine Konfiguration anzuwenden und deine Musik in einer neuen Qualität zu genießen.
5.  **Optimieren** Sinus und Rosa Rauschen sind das eine - Musik hören das andere. Du kannst die Filter in EqualizerAPO bzw. Poweramp Equalizer weiter bearbeiten, um das Klangbild deinen Wünschen anzupassen. Dieses Tool bietet Unterstützung in der Grundabstimmung und der Ermittlung von Resonanzen, das klappt durch die Justierung mit dem Rosa Rauschen erfahrungsgemäß sehr gut und funktioniert für die meisten Musikrichtungen, aber es kann keine Hörerfahrung ersetzen.

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

> ### ⚠️ Safety Notice
> Using sine tones and EQ boosts at high volumes can **damage your hearing** and **overload your hardware (drivers)**. Always start at low volume and proceed with caution.

---

## Project Description & Instructions
### Usage
You can access the Headphone Tuner directly via the following link:
### [➜ Open Headphone Tuner](./index.html)
Please make sure that no filters from a running equalizer (such as EqualizerAPO) are active when using the tool, as these will otherwise distort the results - unless, of course, the tuning is performed directly in the external EQ and the tool’s filters are not used at all.

### Core Features and Tuning Process
* **Sine Generator and Filter Creation:** The sine generator produces a pure waveform at an adjustable frequency, which can be used to detect narrowband resonances (peaks) or cancellations (dips).
    * A new filter is automatically placed at the current position of the sine generator to immediately compensate for level differences. Find the center point and set a filter.
    * The Q factor determines the bandwidth of a filter.
        * *Rule of thumb:* High Q factor (e.g., 4.0 - 8.0) for narrow peaks; low Q factor (e.g., 0.7 - 1.4) for broad corrections.
* **Pink Noise Generator:** Noise with constant energy per octave, ideal for assessing overall tonal balance.
    * No frequency range should "stand out" or "disappear."
    * With pink noise, the amplitude (gain) of the filter can be determined so that this range fits optimally into the overall picture. To do this, I recommend manually adjusting the amplitude value up and down while listening to how it affects the sound of the noise, in order to find the ideal amplitude.
* **Filter Types:** The tool allows the use of filters of the types Peak, High-Shelf, and Low-Shelf, which are the most common filter types and generally sufficient for everyday use.
    * *Note:* Differentiation between the left and right channels (to compensate for channel imbalances) is currently not possible.
    * With extra buttons, a simple bass or treble boost can be added; by reducing the amplitude into the negative, a reduction of the bass or treble is of course also possible.
* **Mouse Wheel Control:** Click an input field (Frequency, Gain, Q) and use the mouse wheel for precise real-time adjustments. Click another area of the page to remove focus from the text field.
* **Smart Preamp:** The tool utilizes the available headroom. A boost does not immediately result in "ducking" of the signal, unless clipping is imminent – then the invisible **limiter** kicks in.
    * The required preamp value is automatically written into the export.
    * Tip: To perform an A/B comparison in EqualizerAPO, disable the preamp in the preset and set it within the config.txt where the preset must also be loaded. Then all filters can be enabled or disabled with a single click without significantly altering the perceived volume.
* **Visualization:** A real-time curve shows the combined frequency response of all active filters including the required preamp.
* **Import of Existing Presets:** Load an existing configuration into the tool to optimize or test it. For this, I recommend, for example, the presets from oratory1990 (more on this below). The tool expects a `.txt` file in the EqualizerAPO format.
    * Caution: Pay attention to the limitations of the filter types – not all filter types available in EqualizerAPO can be used.
    * Tip: Implicitly, the tool is capable of converting EqualizerAPO presets for use in Poweramp Equalizer.

### Summary of Steps
1.  **Search:** Scan the frequency band with the sine generator.
2.  **Lock In:** When you hear a disturbing resonance, add a filter at that location to compensate for it.
3.  **Verify:** Use pink noise to listen whether the headphone now sounds natural and balanced.
4.  **Export:** Save the result as `.txt` (EqualizerAPO) or `.json` (Poweramp Equalizer) and import the file into the corresponding program to apply your configuration and enjoy your music in a new quality.
5.  **Optimize:** Sine and pink noise are one thing – listening to music is another. You can continue to edit the filters in EqualizerAPO or Poweramp Equalizer to adjust the sound to your preferences. This tool provides support for basic tuning and detection of resonances; adjusting with pink noise works very well according to experience and is suitable for most genres of music, but it cannot replace the listening experience.

## Obtaining Presets
Tuning a headphone by ear from scratch is not easy, especially if you haven't gathered any experience yet. A PEQ not only allows the correction of resonances, but also offers the possibility to significantly influence the sonic character of the headphone. Many headphones hold potential that can be truly unleashed with this approach. However, for this to work, it is recommended to obtain a preset based on measurements.

There are essentially two options for this:
### AutoEQ (largest selection, very simple)
https://autoeq.app/

Procedure:
1. Select your headphone
2. Select equalizer app -> EqualizerAPO ParametricEq
3. Download the file and import it into the Headphone Tuner

### oratory1990 (my recommendation, but more effort)
https://www.reddit.com/r/oratory1990/wiki/index/list_of_presets/

Procedure:
* Search for your headphone in the list (usually the default variant works) and download the PDF file
* Enter the filters from the table into the Headphone Tuner (manual work)
* Alternative: Use a chatbot like Gemini to convert the table into an EqualizerAPO preset, attach the PDF and enter the prompt – the following prompt suggestion provides information about the file structure; don't forget to verify the values:
```
Create a .txt file for import into EqualizerAPO using the table in the lower-left corner of the attached PDF file. Please convert Bandwidth (BW) to Q-Factor if necessary (Q ≈ 1.41 / BW).
Each filter should be represented by a new line with the following format:
	Filter: ON [TYPE] Fc [FREQUENCY] Hz Gain [GAIN] dB Q [Q-FACTOR]
	Where [TYPE] can be LSC (Low-Shelf), PK (Peak), or HSC (High-Shelf). The 'ON' must always be present.
Example:
Preamp: -8.5 dB
Filter: ON LSC Fc 105 Hz Gain 4 dB Q 0.71
Filter: ON PK Fc 1000 Hz Gain 2 dB Q 5.2
Filter: ON HSC Fc 5000 Hz Gain -3 dB Q 0.71
```
Then save it as a `.txt` file and import it into the Headphone Tuner.

### Why do I still need to edit the preset?
After the preset has been successfully loaded, you should already notice an improvement with the pink noise. However, it is not yet perfect. Especially in the treble range, the sound becomes very individual, and the measurements underlying the filters are no longer accurate due to physical conditions. This is where the combination of your hearing and your headphones comes into play – this fact is the reason why I developed this tool and the approach.

Recommendation: Especially narrower filters (high Q factor) in ranges above 3 kHz can often simply be deleted and replaced with your own. The tool offers all the options needed to find the right filters here. Broader filters covering a larger frequency range can generally be retained, as they are more about tonal color. But especially in the bass and midrange, the presets are often accurate and helpful for improving the sound of your headphones with little effort.

## Conclusion
That was the most important information about how to use this tool and what it is for. Should you need further help, you will certainly find it in a forum of your choice, where plenty of audio enthusiasts gather. And now, have fun diving into a new listening experience.
