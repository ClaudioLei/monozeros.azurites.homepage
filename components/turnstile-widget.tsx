"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      "expired-callback": () => void
      "error-callback": () => void
    }
  ) => string
  reset: (widgetId?: string) => void
  remove?: (widgetId: string) => void
}

type TurnstileWindow = Window &
  typeof globalThis & {
    turnstile?: TurnstileApi
  }

interface TurnstileWidgetProps {
  action: string
  siteKey?: string
  error?: string
  onToken: (token: string) => void
  onReset: (message: string) => void
}

export function TurnstileWidget({
  action,
  siteKey,
  error,
  onToken,
  onReset,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [runtimeSiteKey, setRuntimeSiteKey] = useState(siteKey || "")
  const activeSiteKey = siteKey || runtimeSiteKey

  useEffect(() => {
    if (siteKey) {
      setRuntimeSiteKey(siteKey)
      return
    }

    let cancelled = false

    fetch("/turnstile-config", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((config) => {
        if (!cancelled && typeof config?.siteKey === "string") {
          setRuntimeSiteKey(config.siteKey)
        }
      })
      .catch(() => {
        onReset("Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut.")
      })

    return () => {
      cancelled = true
    }
  }, [onReset, siteKey])

  useEffect(() => {
    if (!activeSiteKey || !scriptReady || !containerRef.current) {
      return
    }

    const turnstile = (window as TurnstileWindow).turnstile
    if (!turnstile || widgetIdRef.current) {
      return
    }

    widgetIdRef.current = turnstile.render(containerRef.current, {
      sitekey: activeSiteKey,
      callback: onToken,
      "expired-callback": () => {
        onReset("Die Sicherheitsprüfung ist abgelaufen. Bitte bestätigen Sie sie erneut.")
      },
      "error-callback": () => {
        onReset("Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut.")
      },
    })

    return () => {
      if (widgetIdRef.current) {
        const currentTurnstile = (window as TurnstileWindow).turnstile
        currentTurnstile?.remove?.(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [activeSiteKey, onReset, onToken, scriptReady])

  if (!activeSiteKey) {
    return (
      <p className="mt-6 text-xs text-destructive">
        Sicherheitsprüfung ist nicht konfiguriert.
      </p>
    )
  }

  return (
    <div className="mt-6">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        async
        defer
        onLoad={() => setScriptReady(true)}
        onError={() => {
          onReset("Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut.")
        }}
      />
      <div ref={containerRef} data-turnstile-action={action} />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
