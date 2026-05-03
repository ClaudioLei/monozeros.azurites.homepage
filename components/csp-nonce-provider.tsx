"use client"

import { createContext, useContext } from "react"

const CspNonceContext = createContext<string | null>(null)

interface CspNonceProviderProps {
  nonce: string | null
  children: React.ReactNode
}

export function CspNonceProvider({ nonce, children }: CspNonceProviderProps) {
  return (
    <CspNonceContext.Provider value={nonce}>
      {children}
    </CspNonceContext.Provider>
  )
}

export function useCspNonce() {
  return useContext(CspNonceContext)
}
