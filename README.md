# monozeros.azurites.homepage

Next.js 16 Frontend fuer die Monozeros-Azurites-Website. Die App kombiniert Marketingseiten, Kontaktformulare, ein oeffentliches MDR-Assessment, einen tokenbasierten Closed-Assessment-Flow und eine einfache Admin-Oberflaeche fuer geschuetzte Assessments.

## Status

Der aktuelle Stand in diesem Repository umfasst:

- Marketing-Website fuer Monozeros mit eigener Homepage und mehreren Leistungsseiten
- Kontaktformular mit Cloudflare Turnstile und Backend-Weiterleitung
- Oeffentliches `MDR Readiness Assessment` unter `/assessment`
- Geschuetztes Closed Assessment unter `/a/[token]`
- Admin-Seite unter `/admin` fuer Login, Token-Verwaltung und XLSX-Downloads
- Rechtliche Seiten, deren Inhalte aus Markdown-Dateien geladen werden
- CSP/Nonce-Absicherung ueber `proxy.ts`

Nicht aktiv umgesetzt:

- `/insights` und `/insights/[slug]` sind derzeit Platzhalter und leiten auf `/` weiter
- Es gibt keine lokale Implementierung fuer `/api/admin/*`; diese Endpunkte werden per Rewrite an das Backend weitergereicht

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI / shadcn-style UI-Bausteine
- Lucide Icons
- React Hook Form + Zod in Teilen der Assessment-Logik

## Voraussetzungen

- Node.js 22.x empfohlen
- npm 11.x

## Lokale Entwicklung

### 1. Abhaengigkeiten installieren

```bash
npm install
```

### 2. Umgebung konfigurieren

Lege eine `.env.local` an:

```env
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Hinweise:

- `BACKEND_URL` ist erforderlich fuer Kontaktformular, Token-Validierung, Closed-Assessment-Submission und Admin-Rewrite.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` wird fuer `/kontakt`, `/assessment` und den tokenbasierten Assessment-Client verwendet.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` aktiviert Google Analytics 4 auf den freigegebenen Marketingseiten.
- Ohne `NEXT_PUBLIC_TURNSTILE_SITE_KEY` werden die Formulare nicht korrekt nutzbar sein; die UI zeigt dann an, dass die Sicherheitspruefung nicht konfiguriert ist.
- Ohne `NEXT_PUBLIC_GA_MEASUREMENT_ID` wird weder Analytics noch das Consent-Banner geladen.

### 3. Dev-Server starten

```bash
npm run dev -- -p 3005
```

Danach ist die App unter `http://localhost:3005` erreichbar.

## Verfuegbare Skripte

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routen

### Oeffentliche Seiten

```text
/                      Homepage
/mdr-managed-xdr       MDR / Managed XDR Landingpage
/hosting-compliance    Hosting & Compliance
/partner               Partner-Seite
/technologie           Technologie-Seite
/assessment            Oeffentliches MDR Readiness Assessment
/kontakt               Kontaktformular
/ueber-uns             Ueber uns
/impressum             Impressum
/datenschutz           Datenschutz
/agb                   AGB
```

### Closed Assessment

```text
/a/[token]             Tokenbasierter Assessment-Flow
/already-submitted     Link bereits verwendet
/expired-link          Link abgelaufen
/invalid-link          Link ungueltig
/success               Erfolgsseite
```

### Admin / interne Nutzung

```text
/admin                 Login und Verwaltung fuer Closed Assessments
```

### Aktuell deaktiviert

```text
/insights
/insights/[slug]
```

Diese Routen redirecten derzeit auf `/`.

## API-Verhalten im Frontend

Die Homepage hostet einige Next.js Route Handlers als BFF-/Proxy-Schicht:

- `POST /api/contact`
  Leitet Kontakt- und Public-Assessment-Anfragen an `${BACKEND_URL}/api/contact` weiter.
- `POST /api/submit`
  Leitet Closed-Assessment-Submissions an `${BACKEND_URL}/api/submit` weiter.
- `GET /api/token/[token]`
  Validiert Closed-Assessment-Tokens ueber `${BACKEND_URL}/api/token/:token`.
- `GET /internal-api/token/[token]`
  Interne tokenbezogene Validierung fuer den serverseitigen `/a/[token]`-Flow.

Zusatz:

- `next.config.mjs` rewritet `/api/admin/:path*` an `${BACKEND_URL}/api/admin/:path*`, sofern `BACKEND_URL` gesetzt ist.
- Wenn `BACKEND_URL` fehlt, liefern die lokalen API-Routen fuer diese Flows bewusst Fehler statt Mock-Erfolge.

## Analytics und Consent

- Google Analytics 4 wird nur auf ausgewaehlten oeffentlichen Marketingseiten geladen.
- Assessment-, Success-, Admin- und tokenbasierte Flows sind in Phase 1 explizit ausgeschlossen.
- Das Tracking startet erst nach ausdruecklicher Zustimmung ueber das Consent-Banner.
- Die Cookie-Einstellungen koennen anschliessend ueber den Footer erneut geoeffnet werden.
- Fuer den Einsatz von Analytics wurden zusaetzliche CSP-Freigaben in `proxy.ts` hinterlegt.

## Assessments

### `/assessment`

Der oeffentliche Assessment-Flow ist ein clientseitiger 4-Schritt-Lead-Flow:

1. Unternehmensgroesse
2. IT-Infrastruktur
3. Security & Compliance
4. Kontaktdaten + Turnstile

Das Ergebnis wird nicht lokal ausgewertet, sondern als strukturierte Kontaktanfrage ueber `/api/contact` an das Backend geschickt.

### `/a/[token]`

Der geschuetzte Flow ist fuer Closed Assessments gedacht:

- Token wird serverseitig validiert
- Status `expired`, `submitted` und `invalid` werden auf eigene Seiten umgeleitet
- Der Client in `components/assessment/token-assessment-client.tsx` uebermittelt die Antworten ueber `/api/submit`

### `/admin`

Die Admin-Seite ist eine Frontend-Oberflaeche fuer:

- Login
- Erstellen neuer Closed-Assessment-Links
- Kopieren von Secret Links
- Widerrufen aktiver Links
- Versand vorhandener Assessment-Links per Mail
- Einsicht in Einreichungen
- XLSX-Download pro Submission

Die eigentliche Persistenz und Authentisierung liegen im Backend.

## Inhalt und Struktur

### Wichtige Verzeichnisse

```text
app/                   App Router Pages und Route Handlers
components/            Layout-, Home-, Assessment- und UI-Komponenten
content/               Markdown-Inhalte fuer AGB, Datenschutz, Impressum
lib/                   Hilfslogik, Markdown-Renderer, Assessment-Typen/Validation
public/                Statische Assets
styles/                Zusaetzliche Styles
proxy.ts               CSP-/Nonce-Handling fuer Requests
```

### Homepage-Komposition

Die Homepage unter `app/page.tsx` setzt sich aktuell aus folgenden Sektionen zusammen:

- `Header`
- `Hero`
- `TrustBar`
- `ProblemSection`
- `SolutionSection`
- `ROISection`
- `Footer`

## Sicherheit

`proxy.ts` setzt fuer die meisten Seiten eine Content Security Policy mit Request-spezifischem Nonce. Das ist relevant fuer:

- `next/script`-Nutzung
- Cloudflare Turnstile
- Reduzierung unerwuenschter Inline-Skripte

Wenn neue externe Skripte, Frames, Fonts oder Connect-Ziele hinzukommen, muss die CSP dort angepasst werden.

## Build und Deployment

### Lokaler Production-Build

```bash
npm run build
npm run start
```

### Docker

Das Dockerfile baut ein standalone Next.js-Image. Wichtig:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ist im Docker-Build aktuell verpflichtend
- das Image startet auf Port `3000`

Beispiel:

```bash
docker build --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA -t monozeros-homepage .
docker run -p 3000:3000 -e BACKEND_URL=http://host.docker.internal:3001 monozeros-homepage
```

## Pflegehinweise

- Wenn neue Marketingseiten hinzukommen, die Routenliste in dieser README aktualisieren.
- Wenn `/insights` spaeter aktiviert wird, den Platzhalter-Hinweis entfernen.
- Wenn Admin- oder Assessment-APIs lokal implementiert werden, die Beschreibung zur Rewrite-/Proxy-Architektur anpassen.
- Die rechtlichen Inhalte werden aus `content/AGB.md`, `content/DSG.md` und `content/IMPRESSUM.md` geladen.
