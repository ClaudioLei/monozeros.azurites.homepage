"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepEndpointsWorkloadsProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type SelectableItem = {
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

const endpointTypes: SelectableItem[] = [
  { id: "windowsClients", label: "Windows Clients", cell: "C2", placeholder: "z.B. Defender for Endpoint P2" },
  { id: "macosClients", label: "macOS Clients", cell: "C3", placeholder: "z.B. Jamf Protect, Defender" },
  { id: "linuxClients", label: "Linux Clients", cell: "C4", placeholder: "Distribution, Agent oder EDR" },
  { id: "mobileDevices", label: "Mobile Devices", cell: "C5", placeholder: "iOS/Android, MDM oder EDR" },
]

const workloadTypes: SelectableItem[] = [
  { id: "windowsServers", label: "Windows Server", cell: "C6", placeholder: "z.B. Defender for Servers P2" },
  { id: "linuxServers", label: "Linux Server", cell: "C7", placeholder: "Distribution, Agent oder EDR" },
  { id: "cloudWorkloads", label: "Cloud Workloads", cell: "C8", placeholder: "Azure, AWS, GCP, Kubernetes" },
  { id: "containers", label: "Container / Kubernetes", cell: "C9", placeholder: "Cluster, Registry, Runtime Security" },
]

const endpointTechnologies = [
  "Microsoft Defender",
  "CrowdStrike",
  "SentinelOne",
  "Sophos",
  "Trend Micro",
  "Bitdefender",
  "Nicht sicher",
  "Keine",
]

const protectionLevels = ["Vollstaendig", "Teilweise", "Geplant", "Keine", "Nicht sicher"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepEndpointsWorkloads({ onAddAnswer }: StepEndpointsWorkloadsProps) {
  const [itemState, setItemState] = useState<Record<string, ItemState>>({})
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [protectionLevel, setProtectionLevel] = useState("")

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updateItem = (item: SelectableItem, patch: Partial<ItemState>) => {
    const current = itemState[item.id] || { checked: false, quantity: 0, comment: "" }
    const next = { ...current, ...patch }
    setItemState((prev) => ({ ...prev, [item.id]: next }))

    setAnswer(
      item.cell,
      next.checked ? item.label : "",
      next.checked ? next.quantity : 0,
      next.checked ? next.comment : "",
    )
  }

  const toggleTechnology = (technology: string) => {
    const next = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter((item) => item !== technology)
      : [...selectedTechnologies, technology]

    setSelectedTechnologies(next)
    setAnswer("C10", next.join(", "))
  }

  const updateProtectionLevel = (level: string) => {
    setProtectionLevel(level)
    setAnswer("C11", level)
  }

  const renderSelectableItems = (items: SelectableItem[]) => (
    <div className="space-y-3">
      {items.map((item) => {
        const state = itemState[item.id] || { checked: false, quantity: 0, comment: "" }

        return (
          <div key={item.id} className="rounded-lg border border-border p-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                id={item.id}
                checked={state.checked}
                onCheckedChange={(checked) => updateItem(item, { checked: !!checked })}
              />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </label>

            {state.checked && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                <div>
                  <Label htmlFor={`${item.id}-quantity`} className="sr-only">
                    Anzahl
                  </Label>
                  <Input
                    id={`${item.id}-quantity`}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={state.quantity || ""}
                    onChange={(event) => updateItem(item, { quantity: Number(event.target.value) || 0 })}
                    placeholder="Anzahl"
                  />
                </div>
                <Input
                  value={state.comment}
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
        <h2 className="mb-1 text-xl font-semibold text-foreground">Endpoints & Workloads</h2>
        <p className="text-sm text-muted-foreground">
          Mehrfachauswahl, Mengen und manuelle Angaben zu Client- und Server-Schutz
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Client Endpoints</Label>
        {renderSelectableItems(endpointTypes)}
      </div>

      <div>
        <Label className="mb-3 block">Server & Workloads</Label>
        {renderSelectableItems(workloadTypes)}
      </div>

      <div>
        <Label className="mb-3 block">Endpoint-/Workload-Technologien</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {endpointTechnologies.map((technology) => (
            <button
              key={technology}
              type="button"
              onClick={() => toggleTechnology(technology)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                selectedTechnologies.includes(technology)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {technology}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Abdeckung</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {protectionLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => updateProtectionLevel(level)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                protectionLevel === level
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="manualEndpointDetails">Manuelle Angaben</Label>
          <Textarea
            id="manualEndpointDetails"
            rows={4}
            placeholder="Produktmodell, Lizenz, Legacy-Systeme, VDI, OT/IoT, Ausnahmen, Rollout-Status oder Unsicherheiten"
            onBlur={(event) => setAnswer("C12", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
