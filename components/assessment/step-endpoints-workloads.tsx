"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepEndpointsWorkloadsProps {
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

export function StepEndpointsWorkloads({ onAddAnswer }: StepEndpointsWorkloadsProps) {
  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Endpoints & Workloads</h2>
        <p className="text-sm text-muted-foreground">Endpoint Protection, Server Protection und Mengen</p>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="workstationProtection">Endpoint Protection fuer Workstations/Laptops/PCs</Label>
          <Input
            id="workstationProtection"
            placeholder="Ja, Nein, Teilweise oder Nicht sicher"
            onBlur={(event) => setAnswer("C2", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="workstationBrand">Technologie / Brand</Label>
          <Input
            id="workstationBrand"
            placeholder="z.B. Microsoft Defender, CrowdStrike, SentinelOne"
            onBlur={(event) => setAnswer("C3", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="workstationLicense">Produktmodell oder Lizenz</Label>
          <Input
            id="workstationLicense"
            placeholder="z.B. Defender for Endpoint P2, Complete, Nicht sicher"
            onBlur={(event) => setAnswer("C4", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="serverProtection">Endpoint Protection fuer Server/Workloads</Label>
          <Input
            id="serverProtection"
            placeholder="Ja, Nein, Teilweise oder Nicht sicher"
            onBlur={(event) => setAnswer("C5", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="serverBrand">Server-Technologie / Brand und Produktmodell</Label>
          <Input
            id="serverBrand"
            placeholder="z.B. Defender for Servers, CrowdStrike, EDR Agent"
            onBlur={(event) => setAnswer("C6", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="endpointCounts">Anzahl Workstations/Laptops/PCs und Server/Workloads</Label>
          <Textarea
            id="endpointCounts"
            rows={3}
            placeholder="z.B. 180 Workstations/Laptops, 25 Server/Workloads"
            onBlur={(event) => setAnswer("C7", event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
