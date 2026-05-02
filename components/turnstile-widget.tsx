"use client"

import { useEffect } from "react"
import { useState } from "react"
import Script from "next/script"

type TurnstileCallback = (token?: string) => void
type TurnstileWindow = Window &
  typeof globalThis &
  Record<string, TurnstileCallback | undefined>

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
  const successCallback = `onTurnstileSuccess_${action}`
  const expiredCallback = `onTurnstileExpired_${action}`
  const errorCallback = `onTurnstileError_${action}`
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
    if (!activeSiteKey) {
      return
    }

    const scopedWindow = window as TurnstileWindow

    scopedWindow[successCallback] = (token?: string) => {
      if (token) {
        onToken(token)
      }
    }
    scopedWindow[expiredCallback] = () => {
      onReset("Die Sicherheitsprüfung ist abgelaufen. Bitte bestätigen Sie sie erneut.")
    }
    scopedWindow[errorCallback] = () => {
      onReset("Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut.")
    }

    return () => {
      delete scopedWindow[successCallback]
      delete scopedWindow[expiredCallback]
      delete scopedWindow[errorCallback]
    }
  }, [activeSiteKey, errorCallback, expiredCallback, onReset, onToken, successCallback])

  if (!activeSiteKey) {
    return null
  }

  return (
    <div className="mt-6">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div
        className="cf-turnstile"
        data-sitekey={activeSiteKey}
        data-callback={successCallback}
        data-expired-callback={expiredCallback}
        data-error-callback={errorCallback}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
