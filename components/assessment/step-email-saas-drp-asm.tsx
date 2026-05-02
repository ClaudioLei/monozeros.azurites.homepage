"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepEmailSaasDrpAsmProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const saasOptions = [
  { id: "identitySaaS", label: "Identity SaaS", cell: "C78" },
  { id: "securitySaaS", label: "Security SaaS", cell: "C79" },
  { id: "productivitySaaS", label: "Productivity SaaS", cell: "C80" },
  { id: "crmSaaS", label: "CRM SaaS", cell: "C81" },
  { id: "financeSaaS", label: "Finance SaaS", cell: "C82" },
  { id: "hrSaaS", label: "HR SaaS", cell: "C83" },
  { id: "devopsSaaS", label: "DevOps SaaS", cell: "C84" },
  { id: "dataSaaS", label: "Data SaaS", cell: "C85" },
  { id: "ecommerceSaaS", label: "E-Commerce SaaS", cell: "C86" },
  { id: "itsmSaaS", label: "ITSM SaaS", cell: "C87" },
]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepEmailSaasDrpAsm({ onAddAnswer }: StepEmailSaasDrpAsmProps) {
  const [state, setState] = useState<Record<string, { checked: boolean; quantity: number; comment: string }>>({})

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updateOption = (option: typeof saasOptions[number], patch: Partial<{ checked: boolean; quantity: number; comment: string }>) => {
    const current = state[option.id] || { checked: false, quantity: 1, comment: "" }
    const next = { ...current, ...patch }
    setState(prev => ({ ...prev, [option.id]: next }))
    setAnswer(option.cell, next.checked ? option.label : "", next.checked ? next.quantity : 0, next.checked ? next.comment : "")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Email, SaaS, DRP & ASM</h2>
        <p className="text-sm text-muted-foreground">Email-Systeme, SaaS-Anwendungen und externe Risikoquellen</p>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="onPremEmail">On-Prem Email Server oder Gateway</Label>
          <Input
            id="onPremEmail"
            placeholder="z.B. Exchange, Secure Email Gateway oder Nicht vorhanden"
            onBlur={(event) => setAnswer("C70", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cloudEmail">Cloud/SaaS Email Services</Label>
          <Input
            id="cloudEmail"
            placeholder="z.B. Microsoft 365, Google Workspace"
            onBlur={(event) => setAnswer("C71", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="emailSecurity">Email Security Produkte</Label>
          <Input
            id="emailSecurity"
            placeholder="z.B. Defender for Office, Mimecast, Proofpoint"
            onBlur={(event) => setAnswer("C72", event.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Genutzte SaaS-Services</Label>
        <div className="space-y-3">
          {saasOptions.map((option) => {
            const current = state[option.id] || { checked: false, quantity: 1, comment: "" }
            return (
              <div key={option.id} className="rounded-lg border border-border p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    id={option.id}
                    checked={current.checked}
                    onCheckedChange={(checked) => updateOption(option, { checked: !!checked })}
                  />
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                </label>
                {current.checked && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                    <Input
                      type="number"
                      min={0}
                      value={current.quantity}
                      onChange={(event) => updateOption(option, { quantity: Number(event.target.value) || 0 })}
                      aria-label={`${option.label} Menge`}
                    />
                    <Input
                      value={current.comment}
                      onChange={(event) => updateOption(option, { comment: event.target.value })}
                      placeholder="Produktname, Anzahl Tenants oder Kommentar"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="otherSaas">Weitere SaaS-Anwendungen</Label>
        <Textarea
          id="otherSaas"
          rows={3}
          placeholder="Weitere relevante SaaS-Anwendungen oder Kommentare"
          onBlur={(event) => setAnswer("C88", event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="drp">Digital Risk Protection benötigt?</Label>
          <Input
            id="drp"
            placeholder="Ja, Nein oder Nicht sicher"
            onBlur={(event) => setAnswer("C93", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="asm">Attack Surface Management benötigt?</Label>
          <Input
            id="asm"
            placeholder="Ja, Nein oder Nicht sicher"
            onBlur={(event) => setAnswer("C94", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
