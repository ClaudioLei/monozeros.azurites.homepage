"use client"

import { Label } from "@/components/ui/label"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepEndpointsWorkloadsProps {
  onAddAnswer: (answer: XlsxAnswer) => void
  errors: Record<string, string>
}

export function StepEndpointsWorkloads({ onAddAnswer, errors }: StepEndpointsWorkloadsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Endpoints & Workloads</h2>
        <p className="text-sm text-muted-foreground">Endgeräte und Server-Protection</p>
      </div>

      <div className="space-y-4">
        <div className="border border-border/40 rounded-lg p-4">
          <Label className="mb-2 block font-medium">Workstations/Laptops</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ws-vendor" className="text-xs">Hersteller</Label>
              <input
                id="ws-vendor"
                type="text"
                placeholder="z.B. Microsoft Defender"
                className="flex h-9 w-full rounded-md border border-border bg-input px-2 py-1 text-sm"
                onBlur={(e) => {
                  if (e.target.value) {
                    onAddAnswer({
                      cellResponse: "C3",
                      cellQuantity: "D3",
                      cellComment: "E3",
                      response: e.target.value,
                      quantity: 0,
                      comment: ""
                    })
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="ws-count" className="text-xs">Anzahl</Label>
              <input
                id="ws-count"
                type="number"
                placeholder="0"
                className="flex h-9 w-full rounded-md border border-border bg-input px-2 py-1 text-sm"
                onBlur={(e) => {
                  const count = parseInt(e.target.value) || 0
                  onAddAnswer({
                    cellResponse: "C3",
                    cellQuantity: "D3",
                    cellComment: "E3",
                    response: "",
                    quantity: count,
                    comment: ""
                  })
                }}
              />
            </div>
          </div>
        </div>

        <div className="border border-border/40 rounded-lg p-4">
          <Label className="mb-2 block font-medium">Server/Workloads</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="srv-vendor" className="text-xs">Hersteller</Label>
              <input
                id="srv-vendor"
                type="text"
                placeholder="z.B. CrowdStrike"
                className="flex h-9 w-full rounded-md border border-border bg-input px-2 py-1 text-sm"
                onBlur={(e) => {
                  if (e.target.value) {
                    onAddAnswer({
                      cellResponse: "C4",
                      cellQuantity: "D4",
                      cellComment: "E4",
                      response: e.target.value,
                      quantity: 0,
                      comment: ""
                    })
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="srv-count" className="text-xs">Anzahl</Label>
              <input
                id="srv-count"
                type="number"
                placeholder="0"
                className="flex h-9 w-full rounded-md border border-border bg-input px-2 py-1 text-sm"
                onBlur={(e) => {
                  const count = parseInt(e.target.value) || 0
                  onAddAnswer({
                    cellResponse: "C4",
                    cellQuantity: "D4",
                    cellComment: "E4",
                    response: "",
                    quantity: count,
                    comment: ""
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}