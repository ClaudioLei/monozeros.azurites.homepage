"use client"

import { Label } from "@/components/ui/label"
import { CompanyProfile } from "@/lib/assessment/types"

interface StepCompanyProfileProps {
  data: CompanyProfile
  onChange: (data: CompanyProfile) => void
  errors: Record<string, string>
}

const industries = [
  "Healthcare",
  "Finance & Banking",
  "Industrie & Produktion",
  "Professional Services",
  "IT & Technology",
  "Einzelhandel",
  "Öffentliche Hand",
  "Andere",
]

const employeeRanges = [
  "1-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000-5000",
  "5000+",
]

const complianceOptions = [
  "revDSG",
  "ISO 27001",
  "FINMA",
  "KRITIS / ISG",
  "Healthcare",
  "Öffentliche Hand",
]

export function StepCompanyProfile({ data, onChange, errors }: StepCompanyProfileProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Unternehmensprofil</h2>
        <p className="text-sm text-muted-foreground">Branche, Größe und Compliance-Anforderungen</p>
      </div>

      <div>
        <Label className="mb-3 block">Branche *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => onChange({ ...data, industry })}
              className={`p-2 rounded-lg border text-sm transition-all ${
                data.industry === industry
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
        {errors.industry && (
          <p className="text-xs text-destructive mt-1">{errors.industry}</p>
        )}
      </div>

      <div>
        <Label className="mb-3 block">Anzahl Mitarbeitende *</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {employeeRanges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => onChange({ ...data, employees: range })}
              className={`p-2 rounded-lg border text-sm transition-all ${
                data.employees === range
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        {errors.employees && (
          <p className="text-xs text-destructive mt-1">{errors.employees}</p>
        )}
      </div>

      <div>
        <Label htmlFor="locations" className="mb-2 block">Standorte</Label>
        <input
          id="locations"
          type="text"
          placeholder="z.B. 3 Standorte in der Schweiz"
          value={data.locations}
          onChange={(e) => onChange({ ...data, locations: e.target.value })}
          className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <Label htmlFor="countries" className="mb-2 block">Länder</Label>
        <input
          id="countries"
          type="text"
          placeholder="z.B. Schweiz, Deutschland"
          value={data.countries}
          onChange={(e) => onChange({ ...data, countries: e.target.value })}
          className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <Label className="mb-3 block">Internes IT-Team</Label>
        <select
          value={data.internalItTeam}
          onChange={(e) => onChange({ ...data, internalItTeam: e.target.value })}
          className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Bitte wählen</option>
          <option value="0">Kein internes IT-Team</option>
          <option value="1-2">1-2 Personen</option>
          <option value="3-5">3-5 Personen</option>
          <option value="6-10">6-10 Personen</option>
          <option value="10+">10+ Personen</option>
        </select>
      </div>

      <div>
        <Label className="mb-3 block">Compliance-Treiber</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {complianceOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                const drivers = data.complianceDrivers.includes(option)
                  ? data.complianceDrivers.filter(d => d !== option)
                  : [...data.complianceDrivers, option]
                onChange({ ...data, complianceDrivers: drivers })
              }}
              className={`p-2 rounded-lg border text-xs transition-all ${
                data.complianceDrivers.includes(option)
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}