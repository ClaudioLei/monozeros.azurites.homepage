# monozeros.azurites.homepage

Production-ready Next.js frontend for Monozeros GmbH website with integrated MDR Assessment platform.

## Projektüberblick

Dieses Repository enthält die Homepage von Monozeros GmbH inklusive:

- Unternehmenswebsite (Home, Leistungen, Über uns, Kontakt)
- Öffentliches MDR Readiness Assessment (`/assessment`)
- Geschütztes MDR Sizing Assessment (`/a/[token]`)

## Quick Start

### 1. Installieren

```bash
pnpm install
```

### 2. Umgebung einrichten

Erstelle `.env.local`:

```env
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

Für lokale Entwicklung ohne Turnstile können beide Werte weggelassen werden.

### 3. Entwicklungsserver starten

```bash
pnpm dev
```

Die Homepage ist unter `http://localhost:3005` erreichbar.

## Pages & Routen

```
/                    Home
/mdr-managed-xdr     MDR & Managed XDR
/hosting-compliance  Hosting & Compliance
/partner             Für Partner
/technologie         Technologie
/assessment          Öffentliches MDR Readiness Assessment
/insights            Insights
/ueber-uns           Über uns
/kontakt             Kontakt

/a/[token]           Geschützter MDR Sizing Wizard
/success             Erfolgreich abgesendet
/invalid-link        Ungültiger Link
/expired-link        Link abgelaufen
/already-submitted   Bereits verwendet
```

## API Integration

Die Homepage leitet Requests an das Backend weiter:

- `POST /api/contact` → Backend-Kontaktformular
- `GET /api/token/[token]` → Token-Validierung
- `POST /api/submit` → Assessment-Einreichung

Setze `BACKEND_URL` auf die Backend-Instanz (Standard: `http://localhost:3001`).

## Komponenten

```
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
pnpm build
pnpm start
```

Docker-Image wird automatisch gebaut via GitHub Actions. Das Tag kann über `HOMEPAGE_TAG` gesteuert werden.
