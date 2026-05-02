"use client"

import { Label } from "@/components/ui/label"
import { FinalInfo } from "@/lib/assessment/types"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface StepFinalProps {
  data: FinalInfo
  onChange: (data: FinalInfo) => void
  errors: Record<string, string>
}

export function StepFinal({ data, onChange, errors }: StepFinalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Abschluss</h2>
        <p className="text-sm text-muted-foreground">Nachricht und Datenschutzerklärung</p>
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

      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            id="privacy"
            checked={data.privacyAccepted}
            onCheckedChange={(checked) => onChange({ ...data, privacyAccepted: !!checked })}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor="privacy" className="text-foreground font-medium cursor-pointer">
              Datenschutz *
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Wir verwenden Ihre Angaben ausschliesslich zur Einschätzung Ihrer MDR-Anforderungen und zur Kontaktaufnahme. 
              Es werden keine Passwörter, API-Keys oder produktiven Zugangsdaten abgefragt.
            </p>
          </div>
        </label>
        {errors.privacyAccepted && (
          <p className="text-xs text-destructive mt-2">{errors.privacyAccepted}</p>
        )}
      </div>
    </div>
  )
}