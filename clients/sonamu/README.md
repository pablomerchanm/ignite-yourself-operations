# sonamu — Website-Konzept (privat, inoffiziell)

Spekulatives Redesign der Website des Restaurants **sonamu | casual korean dining**
(Berger Straße 184, Frankfurt-Bornheim), erstellt von Ignite Cravings als private
Konzept-Vorschau für die Owner-Outreach. **Keine offizielle Website des Restaurants.**

## Stack

- **HTML + CSS + JS vanilla.** Kein Framework, kein Build-Step, keine Pakete.
- Google Fonts: Bricolage Grotesque (Latin) + Noto Sans KR (Hangul).
- Motion: IntersectionObserver-Reveals + eine CSS-Marquee. `prefers-reduced-motion`
  wird vollständig respektiert (alles sichtbar, keine Animation).
- Eine Seite: `index.html` + `css/styles.css` + `js/main.js`.

## Lokal ausführen

```bash
cd clients/sonamu
python3 -m http.server 8080
# → http://localhost:8080
```

Direktes Öffnen von `index.html` im Browser funktioniert ebenfalls
(keine fetch()-Abhängigkeiten).

## Struktur

```
clients/sonamu/
├── index.html            # die komplette Seite
├── css/styles.css        # Design-System + Layout
├── js/main.js            # Reveals, Header-State, Anker-Offset (~60 Zeilen)
├── public/images/sonamu/ # Konzept-Platzhalter (siehe unten)
├── RESEARCH.md           # Recherche + Design-These
└── DESIGN-NOTES.md       # Konzept, Struktur, Typo-/Farb-/Bild-Logik
```

## Bildmaterial

Alle Fotos stammen aus öffentlich zugänglichen Quellen des Restaurants selbst
(Food-Fotografie der eigenen Wolt-Präsenz, Logo der offiziellen Website) und
dienen **ausschließlich als temporäre Konzept-Platzhalter** zur Demonstration
der Gestaltungsrichtung. Kein Eigentumsanspruch; eine finale Website verwendet
nur vom Restaurant freigegebenes bzw. neu produziertes Material.

## Inhaltliche Quellen

Speisekarte und Preise: Sonamus Lieferkarte über Wolt, Stand August 2026
(auf der Seite als solche gekennzeichnet). Öffnungszeiten, Adresse, Telefon,
E-Mail: sonamu-frankfurt.de. Zitat Ho-Seong Kim: frankfurtdubistsowunderbar.de
(2018). Details und alle Quellen: `RESEARCH.md`.

## Deploy

Statisch — Vercel/Netlify, Projekt auf `clients/sonamu` zeigen lassen.
Vor jeder Veröffentlichung: Freigabe des Restaurants einholen (Bilder, Karte,
Zeiten bestätigen).
