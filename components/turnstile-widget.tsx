"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    if (!siteKey) {
      return
    }

    const scopedWindow = window as TurnstileWindow

    scopedWindow[successCallback] = (token?: string) => {
      if (token) {
        onToken(token)
      }
    }
    scopedWindow[expiredCallback] = () => {
      onReset("Die Sicherheitspruefung ist abgelaufen. Bitte bestaetigen Sie sie erneut.")
    }
    scopedWindow[errorCallback] = () => {
      onReset("Die Sicherheitspruefung konnte nicht geladen werden. Bitte versuchen Sie es erneut.")
    }

    return () => {
      delete scopedWindow[successCallback]
      delete scopedWindow[expiredCallback]
      delete scopedWindow[errorCallback]
    }
  }, [errorCallback, expiredCallback, onReset, onToken, siteKey, successCallback])

  if (!siteKey) {
    return null
  }

  return (
    <div className="mt-6">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback={successCallback}
        data-expired-callback={expiredCallback}
        data-error-callback={errorCallback}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
