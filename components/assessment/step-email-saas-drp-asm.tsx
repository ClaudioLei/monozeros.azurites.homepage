"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XlsxAnswer } from "@/lib/assessment/types"

interface StepEmailSaasDrpAsmProps {
  onAddAnswer: (_answer: XlsxAnswer) => void
  errors: Record<string, string>
}

type SaasItem = {
  id: string
  label: string
  cell: string
  placeholder: string
}

type ItemState = {
  checked: boolean
  quantity: number
  comment: string
}

const emailOptions: SaasItem[] = [
  { id: "m365", label: "Microsoft 365 / Exchange Online", cell: "C70", placeholder: "User, Tenants, Defender for Office" },
  { id: "googleWorkspace", label: "Google Workspace", cell: "C71", placeholder: "User, Domains, Security Center" },
  { id: "onPremExchange", label: "On-Prem Exchange / Gateway", cell: "C72", placeholder: "Server, Gateway, Hygiene-Tool" },
  { id: "emailSecurity", label: "Email Security Gateway", cell: "C73", placeholder: "Proofpoint, Mimecast, Abnormal, Avanan" },
]

const saasOptions: SaasItem[] = [
  { id: "identitySaaS", label: "Identity SaaS", cell: "C78", placeholder: "Okta, Entra, Ping, Admin Logs" },
  { id: "securitySaaS", label: "Security SaaS", cell: "C79", placeholder: "EDR, CSPM, Vuln Mgmt, Admin Logs" },
  { id: "productivitySaaS", label: "Productivity SaaS", cell: "C80", placeholder: "M365, Workspace, Slack, Teams" },
  { id: "crmSaaS", label: "CRM SaaS", cell: "C81", placeholder: "Salesforce, HubSpot, Dynamics" },
  { id: "financeSaaS", label: "Finance SaaS", cell: "C82", placeholder: "ERP, Accounting, Banking Portale" },
  { id: "hrSaaS", label: "HR SaaS", cell: "C83", placeholder: "Personio, Workday, SuccessFactors" },
  { id: "devopsSaaS", label: "DevOps SaaS", cell: "C84", placeholder: "GitHub, GitLab, Azure DevOps, CI/CD" },
  { id: "dataSaaS", label: "Data SaaS", cell: "C85", placeholder: "Snowflake, Databricks, BI, DWH" },
  { id: "ecommerceSaaS", label: "E-Commerce SaaS", cell: "C86", placeholder: "Shopify, Magento, Zahlungsanbieter" },
  { id: "itsmSaaS", label: "ITSM SaaS", cell: "C87", placeholder: "ServiceNow, Jira, Freshservice" },
]

const externalRiskOptions = ["DRP", "ASM", "Brand Monitoring", "Dark Web Monitoring", "VIP Monitoring", "Nicht sicher"]

function cells(cell: string) {
  return {
    cellResponse: cell,
    cellQuantity: cell.replace("C", "D"),
    cellComment: cell.replace("C", "E"),
  }
}

export function StepEmailSaasDrpAsm({ onAddAnswer }: StepEmailSaasDrpAsmProps) {
  const [state, setState] = useState<Record<string, ItemState>>({})
  const [selectedRiskOptions, setSelectedRiskOptions] = useState<string[]>([])

  const setAnswer = (cell: string, response: string, quantity = 0, comment = "") => {
    onAddAnswer({ ...cells(cell), response, quantity, comment })
  }

  const updateOption = (option: SaasItem, patch: Partial<ItemState>) => {
    const current = state[option.id] || { checked: false, quantity: 0, comment: "" }
    const next = { ...current, ...patch }
    setState((prev) => ({ ...prev, [option.id]: next }))
    setAnswer(option.cell, next.checked ? option.label : "", next.checked ? next.quantity : 0, next.checked ? next.comment : "")
  }

  const toggleRiskOption = (option: string) => {
    const next = selectedRiskOptions.includes(option)
      ? selectedRiskOptions.filter((item) => item !== option)
      : [...selectedRiskOptions, option]

    setSelectedRiskOptions(next)
    setAnswer("C93", next.join(", "))
  }

  const renderOptions = (items: SaasItem[]) => (
    <div className="space-y-3">
      {items.map((option) => {
        const current = state[option.id] || { checked: false, quantity: 0, comment: "" }
        return (
          <div key={option.id} className="rounded-lg border border-border p-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                id={option.id}
                checked={current.checked}
                onCheckedChange={(checked) => updateOption(option, { checked: !!checked })}
              />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </label>
            {current.checked && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={current.quantity || ""}
                  onChange={(event) => updateOption(option, { quantity: Number(event.target.value) || 0 })}
                  placeholder="User/Tenants"
                  aria-label={`${option.label} Anzahl`}
                />
                <Input
                  value={current.comment}
                  onChange={(event) => updateOption(option, { comment: event.target.value })}
                  placeholder={option.placeholder}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-xl font-semibold text-foreground">Email, SaaS, DRP & ASM</h2>
        <p className="text-sm text-muted-foreground">Email-Schutz, kritische SaaS-Plattformen und externe Risikoquellen</p>
      </div>

      <div>
        <Label className="mb-3 block">Email-Plattformen und Schutz</Label>
        {renderOptions(emailOptions)}
      </div>

      <div>
        <Label className="mb-3 block">Kritische SaaS-Services</Label>
        {renderOptions(saasOptions)}
      </div>

      <div>
        <Label className="mb-3 block">Externe Risikoquellen</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {externalRiskOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleRiskOption(option)}
              className={`rounded-lg border p-2 text-sm transition-all ${
                selectedRiskOptions.includes(option)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="saasManual">Manuelle Angaben</Label>
        <Textarea
          id="saasManual"
          rows={4}
          placeholder="Weitere SaaS-Anwendungen, Admin-Logs, Integrationen, externe Domains, VIPs, Marken oder Unsicherheiten"
          onBlur={(event) => setAnswer("C94", event.target.value)}
        />
      </div>
    </div>
  )
}
