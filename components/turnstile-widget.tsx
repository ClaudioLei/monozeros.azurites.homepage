"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { useCspNonce } from "@/components/csp-nonce-provider"

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

const TURNSTILE_LOAD_ERROR =
  "Die Sicherheitsprüfung konnte nicht geladen werden. Bitte versuchen Sie es erneut."
const TURNSTILE_EXPIRED_ERROR =
  "Die Sicherheitsprüfung ist abgelaufen. Bitte bestätigen Sie sie erneut."

export function TurnstileWidget({
  action,
  siteKey,
  error,
  onToken,
  onReset,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const onResetRef = useRef(onReset)
  const [scriptReady, setScriptReady] = useState(false)
  const activeSiteKey = siteKey || ""
  const nonce = useCspNonce()

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useEffect(() => {
    onResetRef.current = onReset
  }, [onReset])

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
      callback: (token) => {
        onTokenRef.current(token)
      },
      "expired-callback": () => {
        onResetRef.current(TURNSTILE_EXPIRED_ERROR)
      },
      "error-callback": () => {
        onResetRef.current(TURNSTILE_LOAD_ERROR)
      },
    })

    return () => {
      if (widgetIdRef.current) {
        const currentTurnstile = (window as TurnstileWindow).turnstile
        currentTurnstile?.remove?.(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [activeSiteKey, scriptReady])

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
        nonce={nonce ?? undefined}
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
        onError={() => {
          onResetRef.current(TURNSTILE_LOAD_ERROR)
        }}
      />
      <div ref={containerRef} data-turnstile-action={action} />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
