"use client"

import Link from "next/link"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useId, useState, useSyncExternalStore } from "react"

import { useCspNonce } from "@/components/csp-nonce-provider"
import { Button } from "@/components/ui/button"
import {
  type ConsentPreferences,
  CONSENT_PREFERENCES_UPDATED_EVENT,
  CONSENT_PREFERENCES_STORAGE_KEY,
  OPEN_CONSENT_PREFERENCES_EVENT,
  isAnalyticsEnabledRoute,
  isConsentPreferences,
} from "@/lib/analytics"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const DEFAULT_CONSENT: ConsentPreferences = {
  analytics: "denied",
  version: 1,
}
const ANALYTICS_READY_EVENT = "monozeros:analytics-ready"
const EMPTY_CONSENT_SNAPSHOT = ""

function readStoredConsentSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_CONSENT_SNAPSHOT
  }

  return window.localStorage.getItem(CONSENT_PREFERENCES_STORAGE_KEY) ?? EMPTY_CONSENT_SNAPSHOT
}

function parseConsentSnapshot(snapshot: string) {
  if (!snapshot) {
    return null
  }

  try {
    const parsedValue = JSON.parse(snapshot) as unknown
    return isConsentPreferences(parsedValue) ? parsedValue : null
  } catch {
    return null
  }
}

function writeStoredConsent(preferences: ConsentPreferences) {
  window.localStorage.setItem(
    CONSENT_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences),
  )
  window.dispatchEvent(new Event(CONSENT_PREFERENCES_UPDATED_EVENT))
}

function subscribeToConsentStore(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_PREFERENCES_STORAGE_KEY) {
      onStoreChange()
    }
  }

  window.addEventListener("storage", handleStorage)
  window.addEventListener(CONSENT_PREFERENCES_UPDATED_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener(CONSENT_PREFERENCES_UPDATED_EVENT, onStoreChange)
  }
}

export function AnalyticsConsentManager() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const nonce = useCspNonce()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dialogTitleId = useId()
  const dialogDescriptionId = useId()
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsentStore,
    readStoredConsentSnapshot,
    () => EMPTY_CONSENT_SNAPSHOT,
  )
  const consent = parseConsentSnapshot(consentSnapshot)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isAnalyticsReady, setIsAnalyticsReady] = useState(false)

  useEffect(() => {
    const handleOpenPreferences = () => setIsPreferencesOpen(true)

    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleOpenPreferences)

    return () => {
      window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleOpenPreferences)
    }
  }, [])

  useEffect(() => {
    const handleAnalyticsReady = () => setIsAnalyticsReady(true)

    window.addEventListener(ANALYTICS_READY_EVENT, handleAnalyticsReady)

    return () => {
      window.removeEventListener(ANALYTICS_READY_EVENT, handleAnalyticsReady)
    }
  }, [])

  useEffect(() => {
    if (
      !measurementId ||
      consent?.analytics !== "granted" ||
      !pathname ||
      !isAnalyticsReady
    ) {
      return
    }

    if (!isAnalyticsEnabledRoute(pathname) || typeof window.gtag !== "function") {
      return
    }

    const search = searchParams.toString()
    const pagePath = search ? `${pathname}?${search}` : pathname

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [consent, isAnalyticsReady, measurementId, pathname, searchParams])

  if (!measurementId || !pathname) {
    return null
  }

  const isAnalyticsRoute = isAnalyticsEnabledRoute(pathname)
  const shouldShowBanner = isAnalyticsRoute && consent === null
  const isAnalyticsGranted = consent?.analytics === "granted"

  const saveConsent = (analytics: ConsentPreferences["analytics"]) => {
    const nextConsent: ConsentPreferences = {
      ...DEFAULT_CONSENT,
      analytics,
    }

    writeStoredConsent(nextConsent)
    setIsAnalyticsReady(false)
    setIsPreferencesOpen(false)
  }

  return (
    <>
      {isAnalyticsGranted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            nonce={nonce ?? undefined}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            nonce={nonce ?? undefined}
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                anonymize_ip: true,
                send_page_view: false
              });
              window.dispatchEvent(new Event('${ANALYTICS_READY_EVENT}'));
            `}
          </Script>
        </>
      )}

      {shouldShowBanner && (
        <section className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Analyse
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                Wir moechten Google Analytics verwenden, um die Nutzung unserer
                Marketingseiten zu verstehen und die Website zu verbessern. Das
                Tracking startet erst nach Ihrer Zustimmung.
              </p>
              <Link
                href="/datenschutz"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                Mehr dazu in der Datenschutzerklaerung
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => saveConsent("denied")}
              >
                Ablehnen
              </Button>
              <Button type="button" onClick={() => saveConsent("granted")}>
                Akzeptieren
              </Button>
            </div>
          </div>
        </section>
      )}

      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 py-6 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
            className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="space-y-3">
              <h2 id={dialogTitleId} className="text-xl font-semibold text-foreground">
                Cookie-Einstellungen
              </h2>
              <p
                id={dialogDescriptionId}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                Sie koennen Analytics jederzeit aktivieren oder deaktivieren.
                Notwendige technische Funktionen der Website bleiben davon
                unberuehrt.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background/70 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Analytics</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Google Analytics auf oeffentlichen Marketingseiten zur
                    anonymisierten Nutzungsanalyse.
                  </p>
                </div>
                <div className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
                  {consent?.analytics === "granted" ? "Aktiv" : "Deaktiviert"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreferencesOpen(false)}
              >
                Schliessen
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => saveConsent("denied")}
              >
                Analytics ablehnen
              </Button>
              <Button type="button" onClick={() => saveConsent("granted")}>
                Analytics erlauben
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
