"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"
import { Checkbox } from "@/components/ui/checkbox"

interface StepNetworkSecurityProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

const networkTools = [
  { id: "fortinet", label: "Fortinet", cell: "C8" },
  { id: "paloAlto", label: "Palo Alto", cell: "C9" }, 
  { id: "sophos", label: "Sophos", cell: "C10" },
  { id: "cisco", label: "Cisco", cell: "C11" },
  { id: "sangfor", label: "Sangfor", cell: "C12" },
  { id: "cloudflareWaf", label: "Cloudflare WAF", cell: "C13" },
  { id: "awsWaf", label: "AWS WAF", cell: "C14" },
  { id: "sase", label: "SASE", cell: "C15" },
  { id: "swg", label: "SWG", cell: "C16" },
  { id: "dlp", label: "DLP", cell: "C17" },
]

export function StepNetworkSecurity({ onAddAnswer }: StepNetworkSecurityProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Network & Security Tools</h2>
        <p className="text-sm text-muted-foreground">Bestehende Security-Tools und -Infrastruktur</p>
      </div>

      <div>
        <Label className="mb-3 block">Security Tools</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {networkTools.map((tool) => (
            <label
              key={tool.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary/50 cursor-pointer"
            >
              <Checkbox 
                id={tool.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onAddAnswer({
                      cellResponse: tool.cell,
                      cellQuantity: tool.cell.replace('C', 'D'),
                      cellComment: tool.cell.replace('C', 'E'),
                      response: tool.label,
                      quantity: 1,
                      comment: ""
                    })
                  }
                }}
              />
              <span className="text-sm text-foreground">{tool.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}