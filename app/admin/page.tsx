"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Check,
  Copy,
  Download,
  KeyRound,
  LogOut,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TokenStatus = "active" | "expired" | "submitted" | "revoked"

type ClosedAssessmentToken = {
  id: string
  company: string
  contactEmail: string
  status: TokenStatus
  expiresAt: string
  submittedAt?: string | null
  createdAt: string
  submissionsCount: number
  canSendMail?: boolean
}

type AssessmentSubmission = {
  id: string
  company: string
  contactName: string
  contactEmail: string
  score: number
  category: string
  complexity: string
  xlsxFilename?: string | null
  mailSentAt?: string | null
  createdAt: string
  token: {
    status: TokenStatus
    expiresAt: string
  }
}

type ApiError = {
  error?: {
    code?: string
    message?: string
  }
  message?: string
}

const csrfStorageKey = "azurites-admin-csrf"

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function statusVariant(status: TokenStatus): "default" | "secondary" | "destructive" | "outline" {
  if (status === "active") {
    return "default"
  }
  if (status === "submitted") {
    return "secondary"
  }
  if (status === "revoked") {
    return "destructive"
  }
  return "outline"
}

async function readError(response: Response) {
  const body = (await response.json().catch(() => null)) as ApiError | null
  return body?.error?.message || body?.message || body?.error?.code || response.statusText
}

export default function AdminPage() {
  const [csrfToken, setCsrfToken] = useState("")
  const [tokens, setTokens] = useState<ClosedAssessmentToken[]>([])
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [company, setCompany] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [expiresInDays, setExpiresInDays] = useState(14)
  const [createdLink, setCreatedLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const isLoggedIn = Boolean(csrfToken)
  const activeTokens = useMemo(() => tokens.filter((token) => token.status === "active").length, [tokens])
  const submittedTokens = useMemo(() => tokens.filter((token) => token.status === "submitted").length, [tokens])

  const loadData = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const [tokensResponse, submissionsResponse] = await Promise.all([
        fetch("/api/admin/tokens", { cache: "no-store" }),
        fetch("/api/admin/submissions", { cache: "no-store" }),
      ])

      if (tokensResponse.status === 401 || submissionsResponse.status === 401) {
        setTokens([])
        setSubmissions([])
        setMessage("Bitte anmelden.")
        return
      }

      if (!tokensResponse.ok) {
        throw new Error(await readError(tokensResponse))
      }
      if (!submissionsResponse.ok) {
        throw new Error(await readError(submissionsResponse))
      }

      const tokenResult = (await tokensResponse.json()) as { tokens: ClosedAssessmentToken[] }
      const submissionResult = (await submissionsResponse.json()) as { submissions: AssessmentSubmission[] }
      setTokens(tokenResult.tokens || [])
      setSubmissions(submissionResult.submissions || [])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Daten konnten nicht geladen werden.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const savedCsrf = window.sessionStorage.getItem(csrfStorageKey)
    if (savedCsrf) {
      queueMicrotask(() => setCsrfToken(savedCsrf))
    }

    queueMicrotask(() => {
      void loadData()
    })
  }, [])

  const handleLogin = async () => {
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(await readError(response))
      }

      const result = (await response.json()) as { csrfToken: string }
      setCsrfToken(result.csrfToken)
      window.sessionStorage.setItem(csrfStorageKey, result.csrfToken)
      setPassword("")
      await loadData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login fehlgeschlagen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    setIsSubmitting(true)
    setMessage("")

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
      })
    } finally {
      setCsrfToken("")
      setTokens([])
      setSubmissions([])
      window.sessionStorage.removeItem(csrfStorageKey)
      setIsSubmitting(false)
    }
  }

  const handleCreateToken = async () => {
    setIsSubmitting(true)
    setMessage("")
    setCreatedLink("")
    setCopied(false)

    try {
      const response = await fetch("/api/admin/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          company,
          contact_email: contactEmail,
          expires_in_days: expiresInDays,
        }),
      })

      if (!response.ok) {
        throw new Error(await readError(response))
      }

      const result = (await response.json()) as { secretLink: string }
      setCreatedLink(result.secretLink)
      setCompany("")
      setContactEmail("")
      setExpiresInDays(14)
      await loadData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Token konnte nicht erstellt werden.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyLink = async () => {
    if (!createdLink) {
      return
    }

    await navigator.clipboard.writeText(createdLink)
    setCopied(true)
  }

  const handleRevoke = async (token: ClosedAssessmentToken) => {
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch(`/api/admin/tokens/${token.id}`, {
        method: "DELETE",
        headers: { "x-csrf-token": csrfToken },
      })

      if (!response.ok) {
        throw new Error(await readError(response))
      }

      await loadData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Token konnte nicht widerrufen werden.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendMail = async (token: ClosedAssessmentToken) => {
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch(`/api/admin/tokens/${token.id}/send`, {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
      })

      if (!response.ok) {
        throw new Error(await readError(response))
      }

      const result = (await response.json()) as { mailSent: boolean }
      setMessage(
        result.mailSent
          ? `Assessment-Link wurde an ${token.contactEmail} gesendet.`
          : "SMTP ist nicht konfiguriert; die E-Mail wurde nicht versendet.",
      )
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "E-Mail konnte nicht versendet werden.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              Monozeros Azurites
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Closed Assessments</h1>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                <Button type="button" variant="outline" onClick={loadData} disabled={isLoading}>
                  <RefreshCcw className="h-4 w-4" />
                  Aktualisieren
                </Button>
                <Button type="button" variant="outline" onClick={handleLogout} disabled={isSubmitting}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </header>

        {message && (
          <div className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            {message}
          </div>
        )}

        {!isLoggedIn ? (
          <section className="max-w-md rounded-lg border border-border bg-card p-5">
            <div className="mb-5 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Admin Login</h2>
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="admin-email">E-Mail</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Passwort</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <Button type="button" onClick={handleLogin} disabled={isSubmitting || !email || !password}>
                Login
              </Button>
            </div>
          </section>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Aktive Links</p>
                <p className="mt-1 text-2xl font-semibold">{activeTokens}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Eingereicht</p>
                <p className="mt-1 text-2xl font-semibold">{submittedTokens}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Submissions</p>
                <p className="mt-1 text-2xl font-semibold">{submissions.length}</p>
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-lg font-semibold">Neuen Link erstellen</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_160px_auto] lg:items-end">
                <div>
                  <Label htmlFor="token-company">Firma</Label>
                  <Input
                    id="token-company"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Muster AG"
                  />
                </div>
                <div>
                  <Label htmlFor="token-email">Kontakt E-Mail</Label>
                  <Input
                    id="token-email"
                    type="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    placeholder="kontakt@firma.ch"
                  />
                </div>
                <div>
                  <Label htmlFor="token-expiry">Gültigkeit</Label>
                  <Input
                    id="token-expiry"
                    type="number"
                    min={1}
                    max={90}
                    value={expiresInDays}
                    onChange={(event) => setExpiresInDays(Number(event.target.value) || 14)}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleCreateToken}
                  disabled={isSubmitting || !company || !contactEmail}
                >
                  Erstellen
                </Button>
              </div>

              {createdLink && (
                <div className="mt-4 flex flex-col gap-2 rounded-md border border-border bg-muted/30 p-3 sm:flex-row sm:items-center">
                  <code className="min-w-0 flex-1 break-all text-sm">{createdLink}</code>
                  <Button type="button" variant="outline" onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Kopiert" : "Kopieren"}
                  </Button>
                </div>
              )}
            </section>

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-5">
                <h2 className="text-lg font-semibold">Closed Assessment Links</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Firma</th>
                      <th className="px-4 py-3 font-medium">Kontakt</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Erstellt</th>
                      <th className="px-4 py-3 font-medium">Ablauf</th>
                      <th className="px-4 py-3 font-medium">Submissions</th>
                      <th className="px-4 py-3 text-right font-medium">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr key={token.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium">{token.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">{token.contactEmail}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant(token.status)}>{token.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(token.createdAt)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(token.expiresAt)}</td>
                        <td className="px-4 py-3">{token.submissionsCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendMail(token)}
                              disabled={isSubmitting || token.status !== "active" || !token.canSendMail}
                              title={
                                token.canSendMail
                                  ? "Assessment-Link per Mail senden"
                                  : "Für alte Links ist der Secret-Link nicht rekonstruierbar"
                              }
                            >
                              <Mail className="h-4 w-4" />
                              Mail
                            </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleRevoke(token)}
                            disabled={isSubmitting || token.status !== "active"}
                          >
                            <Trash2 className="h-4 w-4" />
                            Widerrufen
                          </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!isLoading && tokens.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          Noch keine Links vorhanden.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-5">
                <h2 className="text-lg font-semibold">Eingereichte Assessments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Firma</th>
                      <th className="px-4 py-3 font-medium">Kontakt</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Kategorie</th>
                      <th className="px-4 py-3 font-medium">Eingang</th>
                      <th className="px-4 py-3 font-medium">Mail</th>
                      <th className="px-4 py-3 text-right font-medium">Export</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium">{submission.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {submission.contactName}
                          <br />
                          {submission.contactEmail}
                        </td>
                        <td className="px-4 py-3">{submission.score}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {submission.category} / {submission.complexity}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(submission.createdAt)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={submission.mailSentAt ? "secondary" : "outline"}>
                            {submission.mailSentAt ? "gesendet" : "offen"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button asChild size="sm" variant="outline">
                            <a href={`/api/admin/submissions/${submission.id}/xlsx`}>
                              <Download className="h-4 w-4" />
                              XLSX
                            </a>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {!isLoading && submissions.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          Noch keine Assessments eingereicht.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
