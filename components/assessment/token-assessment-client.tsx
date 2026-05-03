"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { TurnstileWidget } from "@/components/turnstile-widget"
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
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

interface TokenAssessmentClientProps {
  token: string
  company: string
}

export function TokenAssessmentClient({ token, company }: TokenAssessmentClientProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [turnstileToken, setTurnstileToken] = useState("")
  const [website, setWebsite] = useState("")
  const [draftLoaded, setDraftLoaded] = useState(false)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

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

  const steps = [
    "Kontakt",
    "Profil",
    "Endpoints",
    "Network",
    "Cloud",
    "Identity",
    "SIEM",
    "SaaS",
    "Compliance",
    "Abschluss",
  ]
  const totalSteps = steps.length
  const progress = (currentStep / totalSteps) * 100
  const draftKey = `closed-assessment-draft:${token}`

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(draftKey)
    if (!savedDraft) {
      queueMicrotask(() => setDraftLoaded(true))
      return
    }

    try {
      const parsed = JSON.parse(savedDraft) as {
        currentStep?: number
        formData?: AssessmentFormData
        website?: string
      }

      queueMicrotask(() => {
        if (parsed.formData) {
          setFormData(parsed.formData)
        }
        if (parsed.currentStep && parsed.currentStep >= 1 && parsed.currentStep <= totalSteps) {
          setCurrentStep(parsed.currentStep)
        }
        if (parsed.website) {
          setWebsite(parsed.website)
        }
      })
    } catch {
      window.localStorage.removeItem(draftKey)
    } finally {
      queueMicrotask(() => setDraftLoaded(true))
    }
  }, [draftKey, totalSteps])

  useEffect(() => {
    if (!draftLoaded) {
      return
    }

    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        currentStep,
        formData,
        website,
      }),
    )
  }, [currentStep, draftKey, draftLoaded, formData, website])

   const addXlsxAnswer = (answer: XlsxAnswer) => {
     setFormData(prev => {
       if (!answer.response && !answer.quantity && !answer.comment) {
         return {
           ...prev,
           xlsxAnswers: prev.xlsxAnswers.filter(
             existing => existing.cellResponse !== answer.cellResponse
           )
         }
       }

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
    if (!isValid) {
      return
    }
    
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
    if (!isValid) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const payload = {
        ...formData,
        companyProfile: {
          ...formData.companyProfile,
          countries: formData.companyProfile.countries
            .split(',')
            .map(country => country.trim())
            .filter(Boolean),
        },
        token,
        turnstileToken,
        ...(website ? { website } : {}),
      }
      const result = await submitAssessment(payload)
      
      if (result.success) {
        window.localStorage.removeItem(draftKey)
        const params = new URLSearchParams()
        if (result.score) {
          params.set('score', String(result.score.score))
          params.set('category', result.score.category)
          params.set('complexity', result.score.complexity)
        }

        router.push(params.size > 0 ? `/success?${params.toString()}` : '/success')
      } else if (result.code === 'ALREADY_SUBMITTED' || result.code === 'TOKEN_NOT_ACTIVE') {
        router.push('/already-submitted')
      } else if (result.code === 'EXPIRED_TOKEN') {
        router.push('/expired-link')
      } else if (result.code === 'INVALID_TOKEN') {
        router.push('/invalid-link')
      } else if (result.code === 'TURNSTILE_FAILED') {
        setTurnstileToken("")
        setErrors({
          turnstile: "Die Sicherheitsprüfung ist fehlgeschlagen oder abgelaufen. Bitte bestätigen Sie sie erneut.",
          submit: result.error || 'Sicherheitsprüfung fehlgeschlagen',
        })
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
      if (!formData.contact.firstName) {
        newErrors.firstName = "Vorname ist erforderlich"
      }
      if (!formData.contact.lastName) {
        newErrors.lastName = "Nachname ist erforderlich"
      }
      if (!formData.contact.email) {
        newErrors.email = "Email ist erforderlich"
      }
      if (formData.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
        newErrors.email = "Ungültige E-Mail-Adresse"
      }
      if (!formData.contact.role) {
        newErrors.role = "Rolle ist erforderlich"
      }
    }

    if (currentStep === 2) {
      if (!formData.companyProfile.industry) {
        newErrors.industry = "Branche ist erforderlich"
      }
      if (!formData.companyProfile.employees) {
        newErrors.employees = "Mitarbeiteranzahl ist erforderlich"
      }
    }

    if (currentStep === 10) {
      if (!formData.final.privacyAccepted) {
        newErrors.privacyAccepted = "Datenschutz muss akzeptiert werden"
      }
      if (!turnstileToken) {
        newErrors.turnstile = "Bitte bestätigen Sie die Sicherheitsprüfung"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const showStep = (step: number, content: ReactNode) => (
    <div key={step} hidden={currentStep !== step}>
      {content}
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border/40">
        <div className="p-6 lg:p-8">
          <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

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
            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
              {steps.map((label, index) => {
                const step = index + 1
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCurrentStep(step)}
                    className={`flex h-9 items-center justify-center rounded-md border text-xs transition-all ${
                      currentStep === step
                        ? "border-primary bg-primary text-primary-foreground"
                        : step < currentStep
                          ? "border-primary/50 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                    title={label}
                  >
                    {step < currentStep ? <Check className="h-3.5 w-3.5" /> : step}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-8">
            {showStep(1, (
              <StepContact
                data={formData.contact}
                onChange={(contact) => setFormData({ ...formData, contact })}
                errors={errors}
              />
            ))}
            {showStep(2, (
              <StepCompanyProfile
                data={formData.companyProfile}
                onChange={(companyProfile) => setFormData({ ...formData, companyProfile })}
                errors={errors}
              />
            ))}
            {showStep(3, <StepEndpointsWorkloads onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(4, <StepNetworkSecurity onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(5, <StepCloud onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(6, <StepIdentity onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(7, <StepSiemSoarMonitoring onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(8, <StepEmailSaasDrpAsm onAddAnswer={addXlsxAnswer} errors={errors} />)}
            {showStep(9, (
              <StepCompliance
                data={formData.companyProfile}
                onChange={(companyProfile) => setFormData({ ...formData, companyProfile })}
                errors={errors}
                onAddAnswer={addXlsxAnswer}
              />
            ))}
            {showStep(10, (
              <StepFinal
                data={formData.final}
                onChange={(final) => setFormData({ ...formData, final })}
                errors={errors}
              />
            ))}
            {currentStep === 10 && (
              <TurnstileWidget
                action="closedAssessment"
                siteKey={turnstileSiteKey}
                error={errors.turnstile}
                onToken={(challengeToken) => {
                  setTurnstileToken(challengeToken)
                  setErrors((currentErrors) => {
                    const nextErrors = { ...currentErrors }
                    delete nextErrors.turnstile
                    return nextErrors
                  })
                }}
                onReset={(message) => {
                  setTurnstileToken("")
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    turnstile: message,
                  }))
                }}
              />
            )}
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
