"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepIdentityProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const identityOptions = [
  { id: "entraId", label: "Entra ID", cell: "C50" },
  { id: "okta", label: "Okta", cell: "C51" },
  { id: "pingIdentity", label: "Ping Identity", cell: "C52" },
  { id: "oneLogin", label: "OneLogin", cell: "C53" },
  { id: "ciamPamIga", label: "CIAM / PAM / IGA", cell: "C54" },
  { id: "cloudIam", label: "Cloud-Native IAM", cell: "C55" },
  { id: "secrets", label: "Secrets & Machine Identity", cell: "C56" },
  { id: "zeroTrust", label: "Zero Trust / ITDR", cell: "C57" },
]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepIdentity({ onAddAnswer }: StepIdentityProps) {
  const [state, setState] = useState<Record<string, { checked: boolean; quantity: number; comment: string }>>({})

  const updateOption = (option: typeof identityOptions[number], patch: Partial<{ checked: boolean; quantity: number; comment: string }>) => {
    const current = state[option.id] || { checked: false, quantity: 1, comment: "" }
    const next = { ...current, ...patch }
    setState(prev => ({ ...prev, [option.id]: next }))
    onAddAnswer({
      ...cells(option.cell),
      response: next.checked ? option.label : "",
      quantity: next.checked ? next.quantity : 0,
      comment: next.checked ? next.comment : "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Identity</h2>
        <p className="text-sm text-muted-foreground">Identity Provider, PAM, IGA und Zero Trust Quellen</p>
      </div>

      <div>
        <Label className="mb-3 block">Identity-Quellen</Label>
        <div className="space-y-3">
          {identityOptions.map((option) => {
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
                      placeholder="Tenant, Benutzeranzahl, Produkt oder Kommentar"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
