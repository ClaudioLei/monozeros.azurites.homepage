"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"
import { Checkbox } from "@/components/ui/checkbox"

interface StepEmailSaasDrpAsmProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const saasOptions = [
  { id: "identitySaaS", label: "Identity SaaS", cell: "C41" },
  { id: "securitySaaS", label: "Security SaaS", cell: "C42" }, 
  { id: "productivitySaaS", label: "Productivity SaaS", cell: "C43" },
  { id: "crmSaaS", label: "CRM SaaS", cell: "C44" },
  { id: "financeSaaS", label: "Finance SaaS", cell: "C45" },
  { id: "hrSaaS", label: "HR SaaS", cell: "C46" },
  { id: "devopsSaaS", label: "DevOps SaaS", cell: "C47" },
  { id: "dataSaaS", label: "Data SaaS", cell: "C48" },
  { id: "ecommerceSaaS", label: "E-Commerce SaaS", cell: "C49" },
  { id: "itsmSaaS", label: "ITSM SaaS", cell: "C50" },
]

export function StepEmailSaasDrpAsm({ onAddAnswer }: StepEmailSaasDrpAsmProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Email, SaaS, DRP & ASM</h2>
        <p className="text-sm text-muted-foreground">Software-Services und externe Services</p>
      </div>

      <div>
        <Label className="mb-3 block">Genutzte SaaS-Services</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {saasOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary/50 cursor-pointer"
            >
              <Checkbox 
                id={option.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onAddAnswer({
                      cellResponse: option.cell,
                      cellQuantity: option.cell.replace('C', 'D'),
                      cellComment: option.cell.replace('C', 'E'),
                      response: option.label,
                      quantity: 1,
                      comment: ""
                    })
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