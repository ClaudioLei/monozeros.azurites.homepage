import { z } from 'zod'

export const contactSchema = z.object({
  company: z.string().min(1, 'Firma ist erforderlich'),
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  role: z.string().min(1, 'Rolle ist erforderlich'),
  email: z.string().email('Gültige E-Mail-Adresse erforderlich'),
  phone: z.string().optional(),
})

export const companyProfileSchema = z.object({
  industry: z.string().min(1, 'Branche ist erforderlich'),
  employees: z.string().min(1, 'Anzahl Mitarbeitender ist erforderlich'),
  locations: z.string().min(1, 'Standorte sind erforderlich'),
  countries: z.string().min(1, 'Länder sind erforderlich'),
  internalItTeam: z.string().min(1, 'IT-Team-Information ist erforderlich'),
  complianceDrivers: z.array(z.string()),
})

export const xlsxAnswerSchema = z.object({
  cellResponse: z.string(),
  cellQuantity: z.string(),
  cellComment: z.string(),
  response: z.string(),
  quantity: z.number().optional(),
  comment: z.string().optional(),
})

export const finalSchema = z.object({
  message: z.string().optional(),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: 'Datenschutz muss akzeptiert werden',
  }),
})

export const assessmentSchema = z.object({
  contact: contactSchema,
  companyProfile: companyProfileSchema,
  xlsxAnswers: z.array(xlsxAnswerSchema),
  final: finalSchema,
})

export type AssessmentFormData = z.infer<typeof assessmentSchema>

export function validateStep(step: number, data: Record<string, unknown>) {
  switch (step) {
    case 1:
      return contactSchema.safeParse(data)
    case 2:
      return companyProfileSchema.safeParse(data)
    case 10:
      return finalSchema.safeParse(data)
    default:
      return { success: true, data }
  }
}