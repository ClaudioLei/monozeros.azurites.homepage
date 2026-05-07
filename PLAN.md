# Plan: Google Analytics in der Homepage

## Ziel

Google Analytics 4 in die `monozeros.azurites.homepage` integrieren, ohne die bestehende Sicherheitsarchitektur zu unterlaufen. Die Implementierung soll mit dem bestehenden Next.js-App-Router-Setup, der aktuellen CSP/Nonce-Absicherung und den rechtlichen Anforderungen an ein zustimmungsbasiertes Tracking vereinbar sein.

## Rahmenbedingungen

- Die Homepage nutzt `Next.js 16` mit App Router.
- Eine Content Security Policy wird zentral in `proxy.ts` gesetzt.
- Die Seite verwendet bereits request-spezifische Nonces.
- Externe Skripte und zusätzliche Request-Ziele müssen deshalb explizit in der CSP freigegeben werden.
- Analytics darf erst nach aktiver Zustimmung geladen werden.

## Vorgehen

### 1. Tracking-Ansatz festlegen

- Google Analytics 4 mit einer `G-...` Measurement ID verwenden.
- Die Measurement ID als `NEXT_PUBLIC_GA_MEASUREMENT_ID` per Environment Variable konfigurieren.
- Die Einbindung zentral im Root-Layout vornehmen, damit sie für alle Marketingseiten gilt.
- Für die Next.js-Integration die von Next empfohlene Google-Analytics-Einbindung verwenden, nicht ein loses manuelles Skript ohne Kapselung.

### 2. Consent-Schicht einbauen

- Eine kleine Consent-Komponente für Analytics ergänzen.
- Standardzustand: Analytics deaktiviert.
- Erst nach expliziter Zustimmung:
  - Consent lokal speichern
  - Analytics-Komponente rendern bzw. aktivieren
- Eine einfache Möglichkeit zum Widerruf oder zur nachträglichen Änderung des Status vorsehen.

### 3. CSP erweitern

- `script-src` um Google Tag Manager Domain ergänzen.
- `connect-src` um die für Google Analytics benötigten Endpunkte ergänzen.
- Falls erforderlich `img-src` um Analytics-Beacons erweitern.
- Prüfen, ob das gewählte Next.js-/Google-Setup zusätzliche Freigaben benötigt.

### 4. Datenschutztext ergänzen

- Die Datenschutzerklärung in `content/DSG.md` um Analytics ergänzen.
- Enthalten sein sollten:
  - Anbieter
  - Zweck
  - Art der Datenverarbeitung
  - Hinweis auf Einwilligung
  - Widerrufsmöglichkeit
  - Verweis auf Google als Empfänger bzw. Unterauftragsverarbeiter

### 5. Konfiguration dokumentieren

- `README.md` der Homepage um die neue Environment Variable ergänzen.
- Kurz dokumentieren:
  - wo die Measurement ID gesetzt wird
  - dass Analytics ohne Consent nicht lädt
  - dass CSP-Anpassungen Teil des Features sind

### 6. Technisch verifizieren

- Lokalen Build ausführen.
- Im Browser prüfen:
  - kein Analytics-Request ohne Consent
  - Requests nach Zustimmung vorhanden
  - keine CSP-Fehler in der Konsole
  - keine Regression bei bestehenden Formularen oder Turnstile

## Geplante Dateien

- `app/layout.tsx`
- neue Consent-/Analytics-Komponente unter `components/`
- `proxy.ts`
- `content/DSG.md`
- `README.md`
- optional `.env.example` oder lokale Env-Dokumentation, falls hier im Projekt üblich

## Offene Entscheidungen

Diese Punkte sind fuer Phase 1 wie folgt festgelegt:

- Es wird ein minimales Analytics-Consent-Banner umgesetzt, kein vollstaendiges Cookie-Preference-Center.
- Google Analytics wird nur auf oeffentlichen Marketingseiten aktiviert.
- Ausgenommen bleiben in Phase 1:
  - `/assessment`
  - `/a/[token]`
  - `/admin`
  - `/success`
  - vergleichbare tokenbasierte oder interne Flows
- Die technische Struktur wird so aufgebaut, dass spaeter weitere Consent-Kategorien wie `marketing` bzw. Google Ads / Conversion Tracking ergaenzt werden koennen.

## Festgelegter Scope fuer Phase 1

### Consent UI

- Banner mit mindestens:
  - `Akzeptieren`
  - `Ablehnen`
  - Link zur Datenschutzseite
- Standardzustand ohne Einwilligung: kein Analytics-Laden
- Consent muss spaeter aenderbar bzw. widerrufbar sein

### Tracking-Scope

- Aktiv auf klassischen Marketingseiten wie:
  - `/`
  - `/mdr-managed-xdr`
  - `/hosting-compliance`
  - `/partner`
  - `/technologie`
  - `/ueber-uns`
  - `/kontakt`
- Nicht Teil von Phase 1:
  - Assessment-Flows
  - Success-/Submission-Flows
  - Admin-Seiten
  - geschuetzte oder tokenbasierte Seiten

### Zukunftssicherheit

- Consent-State nicht nur als boolesches `analytics an/aus` modellieren, sondern so, dass kuenftig mehrere Kategorien moeglich sind.
- CSP-Anpassungen moeglichst auf den jetzigen Analytics-Bedarf begrenzen und nicht pauschal fuer spaetere Werbe-Tools oeffnen.
