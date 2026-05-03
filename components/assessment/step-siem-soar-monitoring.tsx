"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepSiemSoarMonitoringProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type MonitoringItem = {
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

const platforms: MonitoringItem[] = [
  { id: "sentinel", label: "Microsoft Sentinel", cell: "C61", placeholder: "Workspaces, GB/Tag, Retention" },
  { id: "splunk", label: "Splunk", cell: "C62", placeholder: "Indexers, Lizenzvolumen, Cloud/On-Prem" },
  { id: "qradar", label: "QRadar", cell: "C63", placeholder: "EPS, Events, Appliances" },
  { id: "elastic", label: "Elastic / OpenSearch", cell: "C64", placeholder: "Cluster, Nodes, GB/Tag" },
]

const operatingModels = ["Kein SOC", "Bürozeiten", "Extended Hours", "24/7 intern", "24/7 Partner", "Nicht sicher"]
const responseNeeds = ["Alert Triage", "Incident Response", "Threat Hunting", "SOAR Playbooks", "Nachtbereitschaft"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepSiemSoarMonitoring({ onAddAnswer }: StepSiemSoarMonitoringProps) {
  const [state, setState] = useState<Record<string, ItemState>>({})
  const [operatingModel, setOperatingModel] = useState("")
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updatePlatform = (platform: MonitoringItem, patch: Partial<ItemState>) => {
    const current = state[platform.id] || { checked: false, quantity: 0, comment: "" }
    const next = { ...current, ...patch }
    setState((prev) => ({ ...prev, [platform.id]: next }))
    setAnswer(platform.cell, next.checked ? platform.label : "", next.checked ? next.quantity : 0, next.checked ? next.comment : "")
  }

  const updateOperatingModel = (model: string) => {
    setOperatingModel(model)
    setAnswer("C65", model)
  }

  const toggleNeed = (need: string) => {
    const next = selectedNeeds.includes(need)
      ? selectedNeeds.filter((item) => item !== need)
      : [...selectedNeeds, need]

    setSelectedNeeds(next)
    setAnswer("C66", next.join(", "))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">SIEM, SOAR & Monitoring</h2>
        <p className="text-sm text-muted-foreground">Plattformen, Logvolumen, Betriebsmodell und Response-Erwartung</p>
      </div>

      <div>
        <Label className="mb-3 block">Bestehende SIEM-/Monitoring-Plattformen</Label>
        <div className="space-y-3">
          {platforms.map((platform) => {
            const current = state[platform.id] || { checked: false, quantity: 0, comment: "" }
            return (
              <div key={platform.id} className="rounded-lg border border-border p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    id={platform.id}
                    checked={current.checked}
                    onCheckedChange={(checked) => updatePlatform(platform, { checked: !!checked })}
                  />
                  <span className="text-sm font-medium text-foreground">{platform.label}</span>
                </label>
                {current.checked && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={current.quantity || ""}
                      onChange={(event) => updatePlatform(platform, { quantity: Number(event.target.value) || 0 })}
                      placeholder="GB/Tag oder EPS"
                      aria-label={`${platform.label} Volumen`}
                    />
                    <Input
                      value={current.comment}
                      onChange={(event) => updatePlatform(platform, { comment: event.target.value })}
                      placeholder={platform.placeholder}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Betriebsmodell</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {operatingModels.map((model) => (
            <button
              key={model}
              type="button"
              onClick={() => updateOperatingModel(model)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                operatingModel === model
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">MDR-Leistungsbedarf</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {responseNeeds.map((need) => (
            <button
              key={need}
              type="button"
              onClick={() => toggleNeed(need)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                selectedNeeds.includes(need)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {need}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="logSources">Logquellen und Volumen-Breakdown</Label>
          <Textarea
            id="logSources"
            rows={4}
            placeholder="Firewalls, EDR, Identity, Cloud, Email, Server, Anwendungen, geschätztes EPS oder GB/Tag"
            onBlur={(event) => setAnswer("C67", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="soarManual">SOAR, Playbooks und aktuelle Prozesse</Label>
          <Textarea
            id="soarManual"
            rows={3}
            placeholder="Ticketing, Automationen, Eskalation, Bereitschaft, IR-Retainer oder offene Anforderungen"
            onBlur={(event) => setAnswer("C68", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
