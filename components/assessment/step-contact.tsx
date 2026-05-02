"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContactInfo } from "@/lib/assessment/types"

interface StepContactProps {
  data: ContactInfo
  onChange: (data: ContactInfo) => void
  errors: Record<string, string>
}

export function StepContact({ data, onChange, errors }: StepContactProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Kontaktdaten</h2>
        <p className="text-sm text-muted-foreground">Ihre Kontaktdaten für die Rückantwort</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Vorname *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Nachname *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="role">Rolle *</Label>
        <Input
          id="role"
          placeholder="z.B. IT-Leiter, CISO"
          value={data.role}
          onChange={(e) => onChange({ ...data, role: e.target.value })}
          className={errors.role ? "border-destructive" : ""}
        />
        {errors.role && (
          <p className="text-xs text-destructive mt-1">{errors.role}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">E-Mail *</Label>
        <Input
          id="email"
          type="email"
          placeholder="vorname.nachname@firma.ch"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+41 44 123 45 67"
          value={data.phone || ""}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </div>
    </div>
  )
}