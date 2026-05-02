"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"
import { Checkbox } from "@/components/ui/checkbox"

interface StepIdentityProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const identityOptions = [
  { id: "entraId", label: "Entra ID", cell: "C24" },
  { id: "okta", label: "Okta", cell: "C25" }, 
  { id: "pingIdentity", label: "Ping Identity", cell: "C26" },
  { id: "oneLogin", label: "OneLogin", cell: "C27" },
  { id: "ciam", label: "CIAM / externe Benutzer", cell: "C28" },
  { id: "pam", label: "PAM", cell: "C29" },
  { id: "iga", label: "IGA", cell: "C30" },
  { id: "cloudIam", label: "Cloud-Native IAM", cell: "C31" },
  { id: "secrets", label: "Secrets & Machine Identity", cell: "C32" },
  { id: "zeroTrust", label: "Zero Trust / ITDR", cell: "C33" },
]

export function StepIdentity({ onAddAnswer }: StepIdentityProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Identity</h2>
        <p className="text-sm text-muted-foreground">Identitäts- und Access-Management</p>
      </div>

      <div>
        <Label className="mb-3 block">Identity Provider</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {identityOptions.map((option) => (
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