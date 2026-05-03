"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepIdentityProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type IdentityItem = {
  id: string
  label: string
  cell: string
  placeholder: string
}

type ItemState = {
  checked: boolean
  quantity: number
  comment: string
}

const identitySources: IdentityItem[] = [
  { id: "entraId", label: "Microsoft Entra ID", cell: "C50", placeholder: "Tenant, User, P1/P2, Risk Logs" },
  { id: "activeDirectory", label: "Active Directory", cell: "C51", placeholder: "Domains, DCs, Sites, Audit Logs" },
  { id: "okta", label: "Okta", cell: "C52", placeholder: "Tenants, User, System Log" },
  { id: "googleIdentity", label: "Google Identity", cell: "C53", placeholder: "Workspace, Cloud Identity, Audit Logs" },
  { id: "pam", label: "PAM", cell: "C54", placeholder: "CyberArk, BeyondTrust, Delinea" },
  { id: "iga", label: "IGA / Governance", cell: "C55", placeholder: "SailPoint, Saviynt, Rezertifizierung" },
  { id: "machineIdentity", label: "Secrets / Machine Identity", cell: "C56", placeholder: "Vault, Key Vault, Zertifikate" },
  { id: "zeroTrust", label: "Zero Trust / ITDR", cell: "C57", placeholder: "Conditional Access, ITDR, UEBA" },
]

const controlOptions = ["MFA überall", "MFA teilweise", "Privileged Access geschützt", "Risk-based Access", "Nicht sicher"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepIdentity({ onAddAnswer }: StepIdentityProps) {
  const [state, setState] = useState<Record<string, ItemState>>({})
  const [selectedControls, setSelectedControls] = useState<string[]>([])

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updateItem = (item: IdentityItem, patch: Partial<ItemState>) => {
    const current = state[item.id] || { checked: false, quantity: 0, comment: "" }
    const next = { ...current, ...patch }
    setState((prev) => ({ ...prev, [item.id]: next }))
    setAnswer(item.cell, next.checked ? item.label : "", next.checked ? next.quantity : 0, next.checked ? next.comment : "")
  }

  const toggleControl = (control: string) => {
    const next = selectedControls.includes(control)
      ? selectedControls.filter((item) => item !== control)
      : [...selectedControls, control]

    setSelectedControls(next)
    setAnswer("C58", next.join(", "))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">Identity</h2>
        <p className="text-sm text-muted-foreground">Identitätsquellen, privilegierte Zugriffe und relevante Audit-Signale</p>
      </div>

      <div>
        <Label className="mb-3 block">Identity-Quellen</Label>
        <div className="space-y-3">
          {identitySources.map((item) => {
            const current = state[item.id] || { checked: false, quantity: 0, comment: "" }
            return (
              <div key={item.id} className="rounded-lg border border-border p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    id={item.id}
                    checked={current.checked}
                    onCheckedChange={(checked) => updateItem(item, { checked: !!checked })}
                  />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </label>
                {current.checked && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={current.quantity || ""}
                      onChange={(event) => updateItem(item, { quantity: Number(event.target.value) || 0 })}
                      placeholder="Anzahl"
                      aria-label={`${item.label} Anzahl`}
                    />
                    <Input
                      value={current.comment}
                      onChange={(event) => updateItem(item, { comment: event.target.value })}
                      placeholder={item.placeholder}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Identity Controls</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {controlOptions.map((control) => (
            <button
              key={control}
              type="button"
              onClick={() => toggleControl(control)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                selectedControls.includes(control)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {control}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="identityManual">Manuelle Identity-Angaben</Label>
        <Textarea
          id="identityManual"
          rows={4}
          placeholder="Break-glass Accounts, Admin-Anzahl, Service Accounts, externe Identitäten, Hybrid-Join, offene Risiken"
          onBlur={(event) => setAnswer("C59", event.target.value)}
        />
      </div>
    </div>
  )
}
