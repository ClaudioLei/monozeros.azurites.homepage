"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StepSiemSoarMonitoringProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

export function StepSiemSoarMonitoring({ onAddAnswer }: StepSiemSoarMonitoringProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">SIEM, SOAR & Monitoring</h2>
        <p className="text-sm text-muted-foreground">Log-Management und Security Operations</p>
      </div>

      <div>
        <Label className="mb-3 block">Bestehendes SIEM?</Label>
        <RadioGroup 
          defaultValue="no" 
          className="flex gap-4"
          onValueChange={(value) => {
            onAddAnswer({
              cellResponse: "C35",
              cellQuantity: "D35",
              cellComment: "E35",
              response: value === "yes" ? "Ja" : "Nein",
              quantity: value === "yes" ? 1 : 0,
              comment: ""
            })
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="siem-yes" />
            <Label htmlFor="siem-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="siem-no" />
            <Label htmlFor="siem-no">Nein</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">Internes SOC?</Label>
        <RadioGroup 
          defaultValue="no" 
          className="flex gap-4"
          onValueChange={(value) => {
            onAddAnswer({
              cellResponse: "C37",
              cellQuantity: "D37",
              cellComment: "E37",
              response: value === "yes" ? "Ja" : "Nein",
              quantity: value === "yes" ? 1 : 0,
              comment: ""
            })
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="soc-yes" />
            <Label htmlFor="soc-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="soc-no" />
            <Label htmlFor="soc-no">Nein</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">24/7 Bedarf?</Label>
        <RadioGroup 
          defaultValue="no" 
          className="flex gap-4"
          onValueChange={(value) => {
            onAddAnswer({
              cellResponse: "D37",
              cellQuantity: "D37",
              cellComment: "E37",
              response: value === "yes" ? "Ja" : "Nein",
              quantity: value === "yes" ? 1 : 0,
              comment: ""
            })
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="24x7-yes" />
            <Label htmlFor="24x7-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="24x7-no" />
            <Label htmlFor="24x7-no">Nein</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}