# monozeros.azurites.homepage

Production-ready Next.js frontend for the Monozeros GmbH website with the integrated MDR assessment platform.

## Projektueberblick

Dieses Repository enthaelt die Homepage von Monozeros GmbH inklusive:

- Unternehmenswebsite (Home, Leistungen, Ueber uns, Kontakt)
- Oeffentliches MDR Readiness Assessment (`/assessment`)
- Geschuetztes MDR Sizing Assessment (`/a/[token]`)

## Quick Start

### 1. Installieren

```bash
npm install
```

### 2. Umgebung einrichten

Erstelle `.env.local`:

```env
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

Fuer lokale Entwicklung ohne Turnstile koennen beide Werte weggelassen werden.

### 3. Entwicklungsserver starten

```bash
npm run dev -- -p 3005
```

Die Homepage ist unter `http://localhost:3005` erreichbar.

## Pages & Routen

```text
/                    Home
/mdr-managed-xdr     MDR & Managed XDR
/hosting-compliance  Hosting & Compliance
/partner             Fuer Partner
/technologie         Technologie
/assessment          Oeffentliches MDR Readiness Assessment
/insights            Insights
/ueber-uns           Ueber uns
/kontakt             Kontakt

/a/[token]           Geschuetzter MDR Sizing Wizard
/success             Erfolgreich abgesendet
/invalid-link        Ungueltiger Link
/expired-link        Link abgelaufen
/already-submitted   Bereits verwendet
```

## API Integration

Die Homepage leitet Requests an das Backend weiter:

- `POST /api/contact` -> Backend-Kontaktformular
- `GET /api/token/[token]` -> Token-Validierung
- `POST /api/submit` -> Assessment-Einreichung

Setze `BACKEND_URL` auf die Backend-Instanz. Standard ist `http://localhost:3001`.

## Komponenten

```text
/components
  /layout
    Header.tsx
    Footer.tsx
  /sections
    Hero.tsx
    TrustBar.tsx
    ProblemSection.tsx
    SolutionSection.tsx
    RoiSection.tsx
    CtaSection.tsx
  /assessment
    AssessmentLanding.tsx
    AssessmentWizard.tsx
    StepContact.tsx
    StepCompanyProfile.tsx
    StepEndpointsWorkloads.tsx
    StepNetworkSecurity.tsx
    StepCloud.tsx
    StepIdentity.tsx
    StepSiemSoarMonitoring.tsx
    StepEmailSaasDrpAsm.tsx
    StepCompliance.tsx
    StepFinal.tsx
    ProgressBar.tsx
    TrustSidebar.tsx
```

## Build & Deployment

```bash
npm run build
npm run start
```

Docker-Images werden ueber GitHub Actions gebaut. Das Tag kann ueber `HOMEPAGE_TAG` gesteuert werden.
