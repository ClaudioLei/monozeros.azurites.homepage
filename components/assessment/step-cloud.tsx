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

const cloudOptions = [
  { id: "aws", label: "AWS", cell: "C40" },
  { id: "azure", label: "Azure", cell: "C41" },
  { id: "gcp", label: "GCP", cell: "C42" },
]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepCloud({ onAddAnswer }: StepCloudProps) {
  const [state, setState] = useState<Record<string, { checked: boolean; quantity: number; comment: string }>>({})

  const updateProvider = (cloud: typeof cloudOptions[number], patch: Partial<{ checked: boolean; quantity: number; comment: string }>) => {
    const current = state[cloud.id] || { checked: false, quantity: 1, comment: "" }
    const next = { ...current, ...patch }
    setState(prev => ({ ...prev, [cloud.id]: next }))
    onAddAnswer({
      ...cells(cloud.cell),
      response: next.checked ? cloud.label : "",
      quantity: next.checked ? next.quantity : 0,
      comment: next.checked ? next.comment : "",
    })
  }

  const setAnswer = (cell: string, response: string) => {
    onAddAnswer({ ...cells(cell), response, quantity: 0, comment: "" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Cloud</h2>
        <p className="text-sm text-muted-foreground">Cloud-Plattformen, Logging-Services und Cloud Security</p>
      </div>

      <div>
        <Label className="mb-3 block">Cloud-Provider</Label>
        <div className="space-y-3">
          {cloudOptions.map((cloud) => {
            const current = state[cloud.id] || { checked: false, quantity: 1, comment: "" }
            return (
              <div key={cloud.id} className="rounded-lg border border-border p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    id={cloud.id}
                    checked={current.checked}
                    onCheckedChange={(checked) => updateProvider(cloud, { checked: !!checked })}
                  />
                  <span className="text-sm font-medium text-foreground">{cloud.label}</span>
                </label>
                {current.checked && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                    <Input
                      type="number"
                      min={0}
                      value={current.quantity}
                      onChange={(event) => updateProvider(cloud, { quantity: Number(event.target.value) || 0 })}
                      aria-label={`${cloud.label} Menge`}
                    />
                    <Input
                      value={current.comment}
                      onChange={(event) => updateProvider(cloud, { comment: event.target.value })}
                      placeholder="Accounts, Subscriptions, Projekte oder Kommentar"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="cloudServices">Aktivierte Cloud- und Logging-Services</Label>
          <Textarea
            id="cloudServices"
            rows={3}
            placeholder="z.B. CloudTrail, GuardDuty, Azure Activity Logs, Defender for Cloud"
            onBlur={(event) => setAnswer("C43", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cloudSecurityProducts">Third-Party Cloud Security Produkte</Label>
          <Textarea
            id="cloudSecurityProducts"
            rows={3}
            placeholder="z.B. Wiz, Prisma Cloud, Lacework oder Nicht sicher"
            onBlur={(event) => setAnswer("C44", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
