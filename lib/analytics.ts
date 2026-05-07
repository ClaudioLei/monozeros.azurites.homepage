export type AnalyticsConsentState = "granted" | "denied"

export interface ConsentPreferences {
  analytics: AnalyticsConsentState
  version: 1
}

export const CONSENT_PREFERENCES_STORAGE_KEY = "monozeros-consent-preferences"
export const OPEN_CONSENT_PREFERENCES_EVENT = "monozeros:open-consent-preferences"
export const CONSENT_PREFERENCES_UPDATED_EVENT =
  "monozeros:consent-preferences-updated"

const ANALYTICS_ENABLED_ROUTES = new Set([
  "/",
  "/mdr-managed-xdr",
  "/hosting-compliance",
  "/partner",
  "/technologie",
  "/ueber-uns",
  "/kontakt",
])

export function isAnalyticsEnabledRoute(pathname: string) {
  return ANALYTICS_ENABLED_ROUTES.has(pathname)
}

export function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Partial<ConsentPreferences>

  return (
    candidate.version === 1 &&
    (candidate.analytics === "granted" || candidate.analytics === "denied")
  )
}
