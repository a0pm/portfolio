# Abdullah Sultan — Engineering Experience

Final portfolio structure for a continuous, interactive engineering experience.

## Structure
- `index.html` — semantic page shell
- `css/` — base, components, responsive layers
- `js/core/` — application state, navigation, language, theme, observers
- `js/systems/` — Core visual, telemetry simulation, engineering lab
- `data/` — project/credential content and EN/AR translations
- `cv/` — current English CV supplied by Abdullah

## Design direction
The experience uses cinematic scroll, a persistent engineering core, physical-feeling motion and interactive technical demonstrations. It takes inspiration from the *level of interaction* of premium interactive product experiences, not from ORYZO's branding, assets, layout or copy.

## Content rules
- Simulated telemetry is explicitly presented as illustrative.
- Academic/prototype work is not described as deployed industrial systems.
- BGC is described as engineering training/exposure, not employment.
- No performance percentages or achievements are invented.

## Updating
Project cards: `data/content.js`.
Translations: `data/translations.js`.
Core visual: `js/systems/core.js`.
Simulation: `js/systems/simulation.js`.
Lab: `js/systems/lab.js`.

## Local run
Serve this folder over HTTP because the site uses ES modules:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.
