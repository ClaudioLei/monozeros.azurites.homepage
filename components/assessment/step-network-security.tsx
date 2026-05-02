"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepNetworkSecurityProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const networkTools = [
  { id: "fortinet", label: "Fortinet", cell: "C13" },
  { id: "paloAlto", label: "Palo Alto", cell: "C14" },
  { id: "sophos", label: "Sophos", cell: "C15" },
  { id: "cisco", label: "Cisco", cell: "C16" },
  { id: "sangfor", label: "Sangfor", cell: "C17" },
  { id: "cloudflareWaf", label: "Cloudflare WAF", cell: "C18" },
  { id: "awsWaf", label: "AWS WAF", cell: "C19" },
  { id: "sase", label: "SASE", cell: "C20" },
  { id: "swg", label: "SWG", cell: "C21" },
  { id: "dlp", label: "DLP", cell: "C22" },
]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepNetworkSecurity({ onAddAnswer }: StepNetworkSecurityProps) {
  const [toolState, setToolState] = useState<Record<string, { checked: boolean; quantity: number; comment: string }>>({})

  const updateTool = (tool: typeof networkTools[number], patch: Partial<{ checked: boolean; quantity: number; comment: string }>) => {
    const current = toolState[tool.id] || { checked: false, quantity: 1, comment: "" }
    const next = { ...current, ...patch }
    setToolState(prev => ({ ...prev, [tool.id]: next }))

    onAddAnswer({
      ...cells(tool.cell),
      response: next.checked ? tool.label : "",
      quantity: next.checked ? next.quantity : 0,
      comment: next.checked ? next.comment : "",
    })
  }

  const setFreeTextAnswer = (cell: string, response: string, comment = "") => {
    onAddAnswer({
      ...cells(cell),
      response,
      quantity: 0,
      comment,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Network & Security Tools</h2>
        <p className="text-sm text-muted-foreground">Bestehende Security-Tools, Telemetrie und Logvolumen</p>
      </div>

      <div>
        <Label className="mb-3 block">Security Tools</Label>
        <div className="space-y-3">
          {networkTools.map((tool) => {
            const state = toolState[tool.id] || { checked: false, quantity: 1, comment: "" }
            return (
              <div key={tool.id} className="rounded-lg border border-border p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    id={tool.id}
                    checked={state.checked}
                    onCheckedChange={(checked) => updateTool(tool, { checked: !!checked })}
                  />
                  <span className="text-sm font-medium text-foreground">{tool.label}</span>
                </label>
                {state.checked && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                    <Input
                      type="number"
                      min={0}
                      value={state.quantity}
                      onChange={(event) => updateTool(tool, { quantity: Number(event.target.value) || 0 })}
                      aria-label={`${tool.label} Menge`}
                    />
                    <Input
                      value={state.comment}
                      onChange={(event) => updateTool(tool, { comment: event.target.value })}
                      placeholder="Modell, Standort oder Kommentar"
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
          <Label htmlFor="otherSecurityTools">Weitere Security Tools</Label>
          <Textarea
            id="otherSecurityTools"
            rows={3}
            placeholder="Weitere Firewalls, WAF, EDR, NDR, DLP oder Security-Plattformen"
            onBlur={(event) => setFreeTextAnswer("C23", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="mdrTelemetry">Logs/Telemetry für MDR gewünscht?</Label>
          <Input
            id="mdrTelemetry"
            placeholder="Ja, Nein oder Nicht sicher"
            onBlur={(event) => setFreeTextAnswer("C24", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="estimatedVolume">Geschaetztes Volumen in EPS oder GB/Tag</Label>
          <Input
            id="estimatedVolume"
            placeholder="z.B. 500 EPS oder 80 GB/Tag"
            onBlur={(event) => setFreeTextAnswer("C25", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="volumeBreakdown">Breakdown, falls EPS oder GB/Tag unbekannt</Label>
          <Textarea
            id="volumeBreakdown"
            rows={3}
            placeholder="Anzahl Firewalls, Standorte, Server, Cloud-Quellen oder sonstige Schaetzung"
            onBlur={(event) => setFreeTextAnswer("C26", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
