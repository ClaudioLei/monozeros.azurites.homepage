"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"
import { Checkbox } from "@/components/ui/checkbox"

interface StepCloudProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const cloudOptions = [
  { id: "aws", label: "AWS", cell: "C20" },
  { id: "azure", label: "Azure", cell: "C21" }, 
  { id: "gcp", label: "GCP", cell: "C22" },
]

export function StepCloud({ onAddAnswer }: StepCloudProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Cloud</h2>
        <p className="text-sm text-muted-foreground">Cloud-Plattformen und Services</p>
      </div>

      <div>
        <Label className="mb-3 block">Cloud-Provider</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {cloudOptions.map((cloud) => (
            <label
              key={cloud.id}
              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer"
            >
              <Checkbox 
                id={cloud.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onAddAnswer({
                      cellResponse: cloud.cell,
                      cellQuantity: cloud.cell.replace('C', 'D'),
                      cellComment: cloud.cell.replace('C', 'E'),
                      response: cloud.label,
                      quantity: 1,
                      comment: ""
                    })
                  }
                }}
              />
              <span className="text-foreground">{cloud.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}