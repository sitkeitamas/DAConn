# Input file: elvárt mezők (aktuális kód szerint)

Ez a dokumentum a **jelenlegi implementációból** (`backend/transformer.py`) készült.
Az input oszlopokat a rendszer **név alapján** keresi, nem pozíció alapján.

## 1) Kötelezően meglévő oszlopok (hiba, ha hiányoznak)

Az alábbi oszlopok hiánya esetén a transzformáció leáll:

- `Date of birth`
- `Family name(s)`
- `Given name(s)`
- `Mother's previous family name`
- `Mother's given name(s)`
- `E-mail`

## 2) Fontos, de opcionális oszlopok (warning, ha hiányoznak)

Ezek hiánya nem állítja le a futást, de figyelmeztetés készül:

- `Képzéskód`
- `Tanterv`

## 3) A transzformáció által olvasott input oszlopok

Az alábbi oszlopokat a kód ténylegesen használja (ha hiányoznak, jellemzően üres/alapérték kerül a cél mezőbe):

- `Date of birth`
- `Family name(s)`
- `Given name(s)`
- `Mother's previous family name`
- `Mother's given name(s)`
- `Social security number (if any)`
- `Gender`
- `Place of birth`
- `Country of birth`
- `Address: City, town, village`
- `Address: Country`
- `Address: Street address`
- `Address: House number`
- `Address: Postal code`
- `E-mail`
- `Képzéskód`
- `Offer course name`
- `Offer score (extra)`
- `Tanterv`
- `Önktg`
- `Önktg HU`
- `Önktg EN`
- `Pénznem`
- `Citizenship`
- `TO Neptun kód`

## 4) Extra oszlopok kezelése

- A nem ismert / nem használt extra oszlopokat a transzformáció figyelmen kívül hagyja.
- Az oszlopsorrend rugalmas, a feldolgozás fejlécnév alapján történik.

## Forrás

- `backend/transformer.py` (`_validate_source_columns`, `_transform_row`)

## 5) DreamApply (DA) interfész megfeleltetési státusz (előzetes)

Ez egy **előzetes technikai becslés** a jelenlegi DA SDK és dokumentáció alapján.
A végső igazolás egy minta exporttal vagy élő API lekérdezéssel történik.

### 5.1 Biztosan vagy nagy valószínűséggel elérhető mezők

Ezek tipikusan applicant/application alapmezők:

- `Date of birth`
- `Family name(s)`
- `Given name(s)`
- `E-mail`
- `Gender`
- `Place of birth`
- `Country of birth`
- `Address: City, town, village`
- `Address: Country`
- `Address: Street address`
- `Address: House number`
- `Address: Postal code`
- `Social security number (if any)` (előfordulhat eltérő API mezőnévvel)
- `Citizenship` (előfordulhat eltérő API mezőnévvel)

### 5.2 DA oldalon valószínűleg megvan, de mapping/összefésülés kell

Ezek több entitásból jöhetnek (application/offer/program):

- `Offer course name`
- `Offer score (extra)`

Megjegyzés: előfordulhat, hogy az értékek nem egyetlen endpointból, hanem
több lekérdezésből állnak össze.

### 5.3 Instance-specifikus (custom field gyanús), külön ellenőrzendő

Ezek jellemzően intézményi beállítástól függenek:

- `Mother's previous family name`
- `Mother's given name(s)`
- `Képzéskód`
- `Tanterv`
- `Önktg`
- `Önktg HU`
- `Önktg EN`
- `Pénznem`
- `TO Neptun kód`

### 5.4 Következő ellenőrzési lépés

Javasolt egy "field discovery" futás:

1. DA applicant/application export készítése mintán.
2. Export fejléc (header) lista kinyerése.
3. Összevetés ezzel a dokumentummal.
4. Státusz riport: `found` / `alias-needed` / `missing`.
