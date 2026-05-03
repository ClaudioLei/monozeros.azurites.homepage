"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepCloudProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type CloudItem = {
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

const cloudProviders: CloudItem[] = [
  { id: "azure", label: "Microsoft Azure", cell: "C40", placeholder: "Subscriptions, Tenants, Defender for Cloud" },
  { id: "aws", label: "AWS", cell: "C41", placeholder: "Accounts, Organizations, GuardDuty, CloudTrail" },
  { id: "gcp", label: "Google Cloud", cell: "C42", placeholder: "Projects, folders, Security Command Center" },
  { id: "privateCloud", label: "Private Cloud / VMware", cell: "C43", placeholder: "vCenter, NSX, Hypervisor, Standorte" },
]

const cloudSignals: CloudItem[] = [
  { id: "activityLogs", label: "Activity / Audit Logs", cell: "C44", placeholder: "Quelle, Retention, Export-Ziel" },
  { id: "cloudSecurity", label: "Cloud Security Posture", cell: "C45", placeholder: "Defender, Wiz, Prisma, Lacework" },
  { id: "cloudWorkloadProtection", label: "Workload Protection", cell: "C46", placeholder: "Server, Container, Functions" },
  { id: "cloudNetworkLogs", label: "Network Logs", cell: "C47", placeholder: "Flow Logs, Firewall Logs, WAF" },
]

const maturityOptions = ["Aktiv überwacht", "Logs vorhanden", "Teilweise", "Geplant", "Nicht sicher"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepCloud({ onAddAnswer }: StepCloudProps) {
  const [state, setState] = useState<Record<string, ItemState>>({})
  const [maturity, setMaturity] = useState("")

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updateItem = (item: CloudItem, patch: Partial<ItemState>) => {
    const current = state[item.id] || { checked: false, quantity: 0, comment: "" }
    const next = { ...current, ...patch }
    setState((prev) => ({ ...prev, [item.id]: next }))
    setAnswer(item.cell, next.checked ? item.label : "", next.checked ? next.quantity : 0, next.checked ? next.comment : "")
  }

  const updateMaturity = (value: string) => {
    setMaturity(value)
    setAnswer("C48", value)
  }

  const renderItems = (items: CloudItem[]) => (
    <div className="space-y-3">
      {items.map((item) => {
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
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">Cloud</h2>
        <p className="text-sm text-muted-foreground">Provider, Security-Signale, Logquellen und Cloud-Reifegrad</p>
      </div>

      <div>
        <Label className="mb-3 block">Cloud-Provider</Label>
        {renderItems(cloudProviders)}
      </div>

      <div>
        <Label className="mb-3 block">Cloud-Signale für MDR</Label>
        {renderItems(cloudSignals)}
      </div>

      <div>
        <Label className="mb-3 block">Cloud Monitoring Reifegrad</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {maturityOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateMaturity(option)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                maturity === option
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="cloudManual">Manuelle Cloud-Angaben</Label>
        <Textarea
          id="cloudManual"
          rows={4}
          placeholder="Log-Retention, SIEM-Export, kritische Subscriptions, Cloud-native Security, ungeklärte Bereiche"
          onBlur={(event) => setAnswer("C49", event.target.value)}
        />
      </div>
    </div>
  )
}
