"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StepContact } from "@/components/assessment/step-contact"
import { StepCompanyProfile } from "@/components/assessment/step-company-profile"
import { StepEndpointsWorkloads } from "@/components/assessment/step-endpoints-workloads"
import { StepNetworkSecurity } from "@/components/assessment/step-network-security"
import { StepCloud } from "@/components/assessment/step-cloud"
import { StepIdentity } from "@/components/assessment/step-identity"
import { StepSiemSoarMonitoring } from "@/components/assessment/step-siem-soar-monitoring"
import { StepEmailSaasDrpAsm } from "@/components/assessment/step-email-saas-drp-asm"
import { StepCompliance } from "@/components/assessment/step-compliance"
import { StepFinal } from "@/components/assessment/step-final"
import { submitAssessment } from "@/lib/assessment/api"
import { AssessmentFormData, XlsxAnswer } from "@/lib/assessment/types"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface TokenAssessmentClientProps {
  token: string
  company: string
}

export function TokenAssessmentClient({ token, company }: TokenAssessmentClientProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

   const [formData, setFormData] = useState<AssessmentFormData>({
     contact: {
       company: company, // Use the company from token validation
       firstName: "",
       lastName: "",
       role: "",
       email: "",
       phone: "",
     },
     companyProfile: {
       industry: "",
       employees: "",
       locations: "",
       countries: "",
       internalItTeam: "",
       complianceDrivers: [],
     },
     xlsxAnswers: [],
     final: {
       message: "",
       privacyAccepted: false,
     },
   })

  const totalSteps = 10
  const progress = (currentStep / totalSteps) * 100

   const addXlsxAnswer = (answer: XlsxAnswer) => {
     setFormData(prev => {
       // Check if an answer with the same cellResponse already exists
       const existingIndex = prev.xlsxAnswers.findIndex(
         existing => existing.cellResponse === answer.cellResponse
       )
       
       if (existingIndex >= 0) {
         // Replace existing answer
         const newXlsxAnswers = [...prev.xlsxAnswers]
         newXlsxAnswers[existingIndex] = answer
         return {
           ...prev,
           xlsxAnswers: newXlsxAnswers
         }
       } else {
         // Add new answer
         return {
           ...prev,
           xlsxAnswers: [...prev.xlsxAnswers, answer]
         }
       }
     })
   }

  const handleNext = async () => {
    const isValid = validateCurrentStep()
    if (!isValid) return
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const isValid = validateCurrentStep()
    if (!isValid) return

    setIsSubmitting(true)
    
    try {
      const payload = {
        ...formData,
        token,
      }
      const result = await submitAssessment(payload)
      
      if (result.success) {
        router.push('/success')
      } else {
        setErrors({ submit: result.error || 'Ein Fehler ist aufgetreten' })
      }
    } catch {
      setErrors({ submit: 'Verbindungsfehler. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.contact.firstName) newErrors.firstName = "Vorname ist erforderlich"
      if (!formData.contact.lastName) newErrors.lastName = "Nachname ist erforderlich"
      if (!formData.contact.email) newErrors.email = "Email ist erforderlich"
      if (formData.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
        newErrors.email = "Ungültige E-Mail-Adresse"
      }
      if (!formData.contact.role) newErrors.role = "Rolle ist erforderlich"
    }

    if (currentStep === 2) {
      if (!formData.companyProfile.industry) newErrors.industry = "Branche ist erforderlich"
      if (!formData.companyProfile.employees) newErrors.employees = "Mitarbeiteranzahl ist erforderlich"
    }

    if (currentStep === 10) {
      if (!formData.final.privacyAccepted) newErrors.privacyAccepted = "Datenschutz muss akzeptiert werden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContact
            data={formData.contact}
            onChange={(contact) => setFormData({ ...formData, contact })}
            errors={errors}
          />
        )
      case 2:
        return (
          <StepCompanyProfile
            data={formData.companyProfile}
            onChange={(companyProfile) => setFormData({ ...formData, companyProfile })}
            errors={errors}
          />
        )
      case 3:
        return (
          <StepEndpointsWorkloads
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 4:
        return (
          <StepNetworkSecurity
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 5:
        return (
          <StepCloud
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 6:
        return (
          <StepIdentity
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 7:
        return (
          <StepSiemSoarMonitoring
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 8:
        return (
          <StepEmailSaasDrpAsm
            onAddAnswer={addXlsxAnswer}
            errors={errors}
          />
        )
      case 9:
        return (
          <StepCompliance
            data={formData.companyProfile}
            onChange={(companyProfile) => setFormData({ ...formData, companyProfile })}
            errors={errors}
          />
        )
      case 10:
        return (
          <StepFinal
            data={formData.final}
            onChange={(final) => setFormData({ ...formData, final })}
            errors={errors}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border/40">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-foreground">
                MDR Sizing Assessment
              </h1>
              <span className="text-sm text-muted-foreground">
                Schritt {currentStep} von {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mb-8">
            {renderStep()}
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {errors.submit}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                disabled={isSubmitting}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                Weiter
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Assessment absenden
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}