"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepSiemSoarMonitoringProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepSiemSoarMonitoring({ onAddAnswer }: StepSiemSoarMonitoringProps) {
  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">SIEM, SOAR & Monitoring</h2>
        <p className="text-sm text-muted-foreground">Bestehende Plattformen, Logquellen und Betriebsmodell</p>
      </div>

      <div>
        <Label className="mb-3 block">Bestehendes SIEM?</Label>
        <RadioGroup className="flex gap-4" onValueChange={(value) => setAnswer("C61", value === "yes" ? "Ja" : "Nein", value === "yes" ? 1 : 0)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="siem-yes" />
            <Label htmlFor="siem-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="siem-no" />
            <Label htmlFor="siem-no">Nein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="siem-unsure" />
            <Label htmlFor="siem-unsure">Nicht sicher</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="siemDeployment">On-Prem oder Cloud SIEM?</Label>
          <Input
            id="siemDeployment"
            placeholder="z.B. Microsoft Sentinel, Splunk, QRadar, On-Prem oder Cloud"
            onBlur={(event) => setAnswer("C62", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="soarUsage">SOAR-Integration und aktuelle Nutzung</Label>
          <Input
            id="soarUsage"
            placeholder="z.B. SOAR vorhanden, 300 EPS, 50 GB/Tag oder Nicht sicher"
            onBlur={(event) => setAnswer("C63", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="logSourcesSoc">Integrierte Logquellen und internes SOC</Label>
          <Textarea
            id="logSourcesSoc"
            rows={3}
            placeholder="Logquellen, internes SOC, Betriebszeiten oder aktuelles Monitoring"
            onBlur={(event) => setAnswer("C64", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="coverageResponse">24/7 Bedarf, Incident Response und Nachtbereitschaft</Label>
          <Textarea
            id="coverageResponse"
            rows={3}
            placeholder="z.B. 24/7 gewünscht, kein internes SOC, IR vorhanden, Nachtbereitschaft unklar"
            onBlur={(event) => setAnswer("C65", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
