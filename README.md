# Sobczak — Kreator mebli na wymiar (MVP)

Konfigurator mebli drewnianych (regał oraz blat kuchenny) z wizualizacją 3D
w czasie rzeczywistym i zapisem zamówień na dysk dla CRM.

## Uruchomienie

Wymagany tylko Node.js (zero zależności, brak `npm install`):

```bash
node scripts/local-server.js
```

Następnie otwórz **http://localhost:3000**

## Co robi

- Wybór produktu: **regał** (w salonie) lub **blat kuchenny** (w kuchni).
  - Regał: szerokość (30–240 cm), wysokość (20–200 cm), głębokość (15–50 cm), liczba półek (1–8).
  - Blat: szerokość/długość (60–360 cm), głębokość (40–90 cm), grubość (2–6 cm).
- Wybór drewna: **sosna** / **orzech** (zmienia kolor wizualizacji i cenę).
- Realistyczna wizualizacja **3D (Three.js)** dopasowana do produktu:
  - regał w salonie (podłoga deskowa, ściany, okno, dywan, obrazy, roślina),
  - blat na zabudowie kuchennej (szafki shaker, fartuch z płytek, górne szafki, bateria, miska),
  - proceduralne tekstury drewna (mapa koloru + bump), miękkie cienie PBR, obrót kamery myszą i zoom. Przebudowa na żywo przy każdej zmianie parametru.
- Warstwa „bliżej fotorealizmu" (offline, bez zewnętrznych tekstur PBR):
  - **fazowane krawędzie** mebli (`RoundedBoxGeometry`),
  - **HDRI** (`public/assets/env.hdr`, CC0 Poly Haven) dla realistycznych odbić — z `RoomEnvironment` jako natychmiastowym fallbackiem,
  - **RectAreaLight** — miękkie światło dzienne z okna,
  - **post-processing** (SSAO + bloom + SMAA + OutputPass) przez `EffectComposer`.
- **Path tracing** (branch `pathtracing`): przycisk „✨ Render HD" w rogu sceny
  uruchamia fotorealistyczny render bieżącej konfiguracji (`three-gpu-pathtracer`,
  zwendorowany offline). Obraz akumuluje się progresywnie do ~64 próbek; każda
  zmiana parametru, obrót kamery lub ponowny klik wraca do podglądu real-time.
- Szacowana cena (regał: objętość × stawka m³; blat: powierzchnia × stawka m² + obróbka).
- Komentarz oraz opcjonalne dane kontaktowe.

## Zapis zamówień (dla CRM)

Po złożeniu zamówienia serwer zapisuje w katalogu `data/`:

- `orders.csv` — jeden wiersz na zamówienie, format RFC-4180 (gotowy do importu w CRM/Excel).
- `ZAM-XXXX.txt` — czytelny plik szczegółów pojedynczego zamówienia.

Kolumny CSV: `order_id, created_at, name, email, phone, product, wood, width_cm,
height_cm, depth_cm, thickness_cm, shelves, volume_m3, price_pln, comment`.
Dla regału wypełnione są `height_cm` i `shelves`; dla blatu — `thickness_cm`.

## Struktura

```
scripts/local-server.js  # lokalny serwer HTTP (Node wbudowany) + zapis zamówień
api/order.mjs            # bezstanowy endpoint zamówień dla Vercel
public/index.html        # interfejs kreatora (importmap dla Three.js)
public/styles.css        # style
public/app.js            # formularz, ceny, wysyłka zamówienia
public/scene.js          # wizualizacja 3D (Three.js) + tekstury drewna
public/vendor/           # lokalnie zwendorowany Three.js (offline, bez CDN)
data/                    # zapisane zamówienia (CSV + TXT)
```
