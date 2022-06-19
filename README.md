# Game of Life

[_Conway's Game of Life_](https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens) ist eine mathematische Simulation von zellulären Automaten. Es basiert auf einem zweidimensionalen Gitter, das in Zellen unterteilt ist. Eine Zelle kann entweder lebendig oder tot sein. Der Zustand einer Zelle kann sich in jedem Zyklus ändern. Dies geschieht anhand der folgenden Regeln:

1. _Geburt_: Eine tote Zelle mit **drei** lebenden Nachbarn wird in der nächsten Generation leben.
2. _Überleben_: Eine lebende Zelle mit **zwei oder drei** lebenden Nachbarn bleibt in der nächsten Generation am Leben.
3. _Tod durch Einsamkeit_: Eine lebende Zelle mit **weniger als zwei** lebenden Nachbarn wird in der nächsten Generation tot sein.
4. _Tod durch Überbevölkerung_: Eine lebende Zelle mit **mehr als drei** lebenden Nachbarn wird in der nächsten Generation tot sein.

## Aufgaben

### 1) Ansicht optimieren

Öffnen Sie die Datei `index.html` im Browser. Das Feld ist mit 32 Zeilen und 48 Spalten für kleinere Bildschirme optimiert. Passen Sie die Attribute `data-rows` und `data-cols` des Elements `div#world` an, damit das Spielfeld so gross wie möglich, aber bei geöffneten Developer Tools dennoch komplett sichtbar ist.

Sie können auch die CSS-Definition (`style.css`) der Klasse `cell` anpassen, indem Sie Höhe (`height`) und Breite (`width`) anpassen. Achten Sie aber darauf, dass die Zellen weiterhin quadratisch sind, d.h. `height` und `width` den gleichen Wert haben.

Sie können auch die Farben der Zellen (`.cell`, `.cell.alive`) anpassen.

Die Simulation wird noch nicht funktionieren, wenn Sie diese im Browser starten.

### 2) JavaScript-Code lesen

Öffnen Sie die Datei `gol.js`. Zuoberst wird auf den Event `DOMContentLoaded` reagiert. Dieser Event-Handling-Code beinhaltet die übergeordnete Spiellogik, sowie die Behandlung der Formularinteraktionen (Start, Stop, Intervall-Anpassungen). Weiter unten sind verschiedene Hilfsfunktionen implementiert. Lesen Sie den Code und versuchen Sie, diesen zu verstehen. Sie werden auf verschiedene `TODO:`-Kommentare stossen, welche für die folgenden Aufgaben relevant sind.

### 3) Zählen lebender benachbarter Zellen

Gehen Sie zur Funktion `countLivingNeighbours`. Diese ist noch nicht implementiert und gibt daher immer 0 zurück. Die Funktion erhält folgende Parameter:

1. `field`: Das Spielfeld als zweidimensionales Boolean-Array. Eine Zelle (`field[row][col]`) ist entweder lebendig (`true`) oder tot (`false`).
2. `row`: Der 0-basierte Zeilenindex der Zelle.
3. `col`: Der 0-basierte Spaltenindex der Zelle.

Finden Sie heraus, wie viele lebendige Nachbarn die Zelle `field[row][col]` hat. Als Nachbar gelten nicht nur Zellen links (Ost), rechts (West), oben (Nord) oder unten (Süd) der Ausgangszelle, sondern auch diagonal benachbarte Zellen (Nordwest, Nordost, Südost, Südwest).

Testen Sie die berechneten Werte mithilfe von Konsolenausgaben (`console.log`). Sie können hierzu auch das Feld verkleinern, damit die Ausgabe übersichtlich bleibt.

#### Zusatzaufgabe: Clipping (am Rande der Welt)

Eine Zelle inmitten des Spielfelds hat immer acht Nachbarn. Eine Zelle am Rand des Spielfelds hat rein optisch betrachtet weniger als acht Nachbarn. Geht man hingegen davon aus, dass die Welt nicht flach ist, sondern dass das obere mit dem unteren bzw. das linke mit dem rechten Ende verbunden ist, hat jede Zelle acht Nachbarn.

Um die Logik entsprechend umsetzen zu können, muss man beim Überlauf des Spalten- bzw. Zeilenindex einfach wieder bei 0 zu zählen anfangen. Hierbei ist der Modulo-Operator hilfreich:

```javascript
const totalRows = 32;
const totalCols = 48;

let column = totalCols - 1;
const fieldInTheMiddleOnTheRightBorder = fields[totalRows/2][column];
const fieldToTheRightOfThat = fields[totalRows/2][(column + 1) % totalCols];
```

Implementieren Sie die Funktion `countLivingNeighbours` so, dass immer sämtliche acht Nachbarn jeder Zelle berücksichtigt werden, ohne dass dabei eine Verletzung der Array-Grenzen auftritt.

### 4) Berechnung der nächsten Generation

Haben Sie die Funktion `countLivingNeighbours` korrekt implementiert, können Sie nun die Funktion `computeNextGeneration` fertig umsetzen. Achten Sie hierzu auf die beiden `TODO:`-Kommentare. Die vier Regeln zur Berechnung der nächsten Generation finden Sie oben an diesem Dokument.

Testen Sie Ihre Implementierung mit verschiedenen [Objekten](https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens#Die_Objekte).

### 5) Weitere Objekte hinzufügen

Das Spielfeld zeigt beim Laden der Seite jeweils einen _Glider_ an. Dieses Objekt sollte sich bei einer korrekten Implementierung von oben links nach unten rechts des Spielfelds bewegen. Die Funktion `addGlider` fügt dem bestehenden Spielfeld einen Glider hinzu.

Suchen Sie sich ein [oszillierendes Objekt](https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens#Oszillierende_Objekte) oder [sonstiges Objekt](https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens#Andere_Objekte) aus, das beim Start auf dem Spielfeld vorhanden sein soll.

Schreiben Sie eine entsprechende Funktion (z.B. `addFPentomino` für das f-Pentomino), welche das Objekt ungefähr in der Spielfeldmitte platziert. Rufen Sie diese Funktion oben im Event-Handling-Code von `DOMContentLoaded` auf.

Wenn Sie alles richtig gemacht haben, dürfte der Glider bald mit Ihrem Objekt kollidieren, was eine interessante, neue Konstellation zur Folge haben könnte.

#### Zusatzaufgabe: Gosper Glider Gun

Der Hacker Bill Gosper hat eine Konstellation herausgefunden, die immer neue Glider erzeugt, die sogenannte [Gosper Glider Gun](https://conwaylife.com/wiki/Gosper_glider_gun). Versuchen Sie, diese Konstellation nachzubauen.