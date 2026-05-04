"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FinalInfo } from "@/lib/assessment/types"

interface StepFinalProps {
  data: FinalInfo
  onChange: (data: FinalInfo) => void
  errors: Record<string, string>
}

export function StepFinal({ data, onChange, errors }: StepFinalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">Abschluss</h2>
        <p className="text-sm text-muted-foreground">
          Nachricht und Datenschutzerklärung
        </p>
      </div>

      <div>
        <Label htmlFor="message">Nachricht (optional)</Label>
        <Textarea
          id="message"
          placeholder="Zusätzliche Informationen oder besondere Anforderungen"
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          rows={4}
        />
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            checked={data.privacyAccepted}
            onCheckedChange={(checked) =>
              onChange({ ...data, privacyAccepted: !!checked })
            }
            className="mt-0.5"
          />
          <div>
            <Label
              htmlFor="privacy"
              className="cursor-pointer font-medium text-foreground"
            >
              Datenschutz *
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Wir verwenden Ihre Angaben ausschliesslich zur Einschätzung Ihrer
              MDR-Anforderungen und zur Kontaktaufnahme. Es werden keine
              Passwörter, API-Keys oder produktiven Zugangsdaten abgefragt.
            </p>
          </div>
        </div>
        {errors.privacyAccepted && (
          <p className="mt-2 text-xs text-destructive">{errors.privacyAccepted}</p>
        )}
      </div>
    </div>
  )
}
