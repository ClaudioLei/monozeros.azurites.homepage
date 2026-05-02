export interface ContactInfo {
  company: string
  firstName: string
  lastName: string
  role: string
  email: string
  phone?: string
}

export interface CompanyProfile {
  industry: string
  employees: string
  locations: string
  countries: string
  internalItTeam: string
  complianceDrivers: string[]
}

export interface XlsxAnswer {
  cellResponse: string
  cellQuantity: string
  cellComment: string
  response: string
  quantity: number
  comment: string
}

export interface FinalInfo {
  message: string
  privacyAccepted: boolean
}

export interface AssessmentFormData {
  contact: ContactInfo
  companyProfile: CompanyProfile
  xlsxAnswers: XlsxAnswer[]
  final: FinalInfo
}

export interface TokenResponse {
  valid: boolean
  status: 'active' | 'expired' | 'submitted' | 'revoked' | 'invalid'
  company?: string
}

export interface AssessmentStep {
  id: number
  title: string
  description: string
  fields: string[]
}

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  { id: 1, title: 'Kontakt', description: 'Ihre Kontaktdaten', fields: ['company', 'firstName', 'lastName', 'role', 'email', 'phone'] },
  { id: 2, title: 'Unternehmensprofil', description: 'Branche und Größe', fields: ['industry', 'employees', 'locations', 'countries', 'internalItTeam', 'complianceDrivers'] },
  { id: 3, title: 'Endpoints & Workloads', description: 'Endgeräte und Server', fields: ['endpointWorkstations', 'endpointServer', 'endpointCount', 'serverCount'] },
  { id: 4, title: 'Network & Security', description: 'Security-Tools', fields: ['networkTools'] },
  { id: 5, title: 'Cloud', description: 'Cloud-Plattformen', fields: ['cloudProviders'] },
  { id: 6, title: 'Identity', description: 'Identitäts-Provider', fields: ['identityProviders'] },
  { id: 7, title: 'SIEM & Monitoring', description: 'Log-Management', fields: ['siem'] },
  { id: 8, title: 'SaaS & DRP', description: 'Software-Services', fields: ['saas'] },
  { id: 9, title: 'Compliance', description: 'Regulatorische Vorgaben', fields: ['compliance'] },
  { id: 10, title: 'Abschluss', description: 'Nachricht & Datenschutz', fields: ['message', 'privacy'] },
]
