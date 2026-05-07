"use client"

import { OPEN_CONSENT_PREFERENCES_EVENT } from "@/lib/analytics"

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT))}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie-Einstellungen
    </button>
  )
}
