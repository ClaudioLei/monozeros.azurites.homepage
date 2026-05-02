"use client"

import { Label } from "@/components/ui/label"
import { CompanyProfile } from "@/lib/assessment/types"
import { Checkbox } from "@/components/ui/checkbox"

interface StepComplianceProps {
  data: CompanyProfile
  onChange: (data: CompanyProfile) => void
  errors: Record<string, string>
}

const complianceOptions = [
  { id: "revDSG", label: "revDSG" },
  { id: "ISO27001", label: "ISO 27001" },
  { id: "FINMA", label: "FINMA" },
  { id: "KRITIS", label: "KRITIS / ISG" },
  { id: "Healthcare", label: "Healthcare" },
  { id: "Public", label: "Öffentliche Hand" },
]

export function StepCompliance({ data, onChange }: StepComplianceProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Compliance</h2>
        <p className="text-sm text-muted-foreground">Regulatorische Vorgaben und Standards</p>
      </div>

      <div>
        <Label className="mb-3 block">Anwendbare Compliance-Standards</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {complianceOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary/50 cursor-pointer"
            >
              <Checkbox 
                id={option.id}
                checked={data.complianceDrivers.includes(option.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange({ ...data, complianceDrivers: [...data.complianceDrivers, option.id] })
                  } else {
                    onChange({ ...data, complianceDrivers: data.complianceDrivers.filter(d => d !== option.id) })
                  }
                }}
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}