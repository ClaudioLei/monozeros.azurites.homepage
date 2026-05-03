"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CompanyProfile, XlsxAnswer } from "@/lib/assessment/types"

interface StepComplianceProps {
  data: CompanyProfile
  onChange: (data: CompanyProfile) => void
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type ComplianceItem = {
  id: string
  label: string
  cell: string
}

const complianceOptions: ComplianceItem[] = [
  { id: "revDSG", label: "revDSG", cell: "C95" },
  { id: "ISO27001", label: "ISO 27001", cell: "C96" },
  { id: "FINMA", label: "FINMA", cell: "C97" },
  { id: "KRITIS", label: "KRITIS / ISG", cell: "C98" },
  { id: "Healthcare", label: "Healthcare", cell: "C99" },
  { id: "Public", label: "Öffentliche Hand", cell: "C100" },
  { id: "PCI", label: "PCI DSS", cell: "C101" },
  { id: "NIS2", label: "NIS2", cell: "C102" },
]

const criticalityOptions = ["Niedrig", "Normal", "Hoch", "Geschäftskritisch", "Nicht sicher"]
const ownerOptions = ["Intern", "MSP", "MSSP/MDR Partner", "Gemischt", "Nicht sicher"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepCompliance({ data, onChange, onAddAnswer }: StepComplianceProps) {
  const [criticality, setCriticality] = useState("")
  const [owner, setOwner] = useState("")

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const toggleCompliance = (option: ComplianceItem, checked: boolean) => {
    const nextDrivers = checked
      ? Array.from(new Set([...data.complianceDrivers, option.id]))
      : data.complianceDrivers.filter((driver) => driver !== option.id)

    onChange({ ...data, complianceDrivers: nextDrivers })
    setAnswer(option.cell, checked ? option.label : "", checked ? 1 : 0)
  }

  const updateCriticality = (value: string) => {
    setCriticality(value)
    setAnswer("C103", value)
  }

  const updateOwner = (value: string) => {
    setOwner(value)
    setAnswer("C104", value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">Compliance</h2>
        <p className="text-sm text-muted-foreground">Regulatorische Treiber, Kritikalität und Verantwortlichkeiten</p>
      </div>

      <div>
        <Label className="mb-3 block">Anwendbare Compliance-Standards</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {complianceOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 hover:border-primary/50"
            >
              <Checkbox
                id={option.id}
                checked={data.complianceDrivers.includes(option.id)}
                onCheckedChange={(checked) => toggleCompliance(option, !!checked)}
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Business-Kritikalität</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {criticalityOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateCriticality(option)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                criticality === option
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
        <Label className="mb-3 block">Security-Betriebsverantwortung</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {ownerOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateOwner(option)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                owner === option
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="auditDeadline">Audit, Deadline oder regulatorischer Termin</Label>
          <Input
            id="auditDeadline"
            placeholder="z.B. ISO Audit Q4, FINMA Review, Kundenaudit, keine Deadline"
            onBlur={(event) => setAnswer("C105", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="complianceManual">Manuelle Anforderungen</Label>
          <Textarea
            id="complianceManual"
            rows={4}
            placeholder="Reporting, Datenstandort, Aufbewahrung, Reaktionszeiten, SLAs, Nachweise oder besondere Kontrollen"
            onBlur={(event) => setAnswer("C106", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
