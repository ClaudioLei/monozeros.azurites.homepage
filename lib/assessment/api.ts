export async function validateToken(token: string): Promise<{
  valid: boolean
  status: 'active' | 'expired' | 'submitted' | 'revoked' | 'invalid'
  company?: string
}> {
  try {
    const response = await fetch(`/api/token/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 410) {
        return { valid: false, status: 'expired' }
      }
      if (response.status === 409) {
        return { valid: false, status: 'submitted' }
      }
      return { valid: false, status: 'invalid' }
    }

    const data = await response.json()
    return {
      valid: data.valid,
      status: data.status,
      company: data.company,
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return { valid: false, status: 'invalid' }
  }
}

export async function submitAssessment(data: unknown): Promise<{
  success: boolean
  error?: string
  code?: string
  score?: {
    score: number
    category: string
    complexity: string
  }
}> {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorResult = await response.json().catch(() => null)
      return {
        success: false,
        error: errorResult?.message || errorResult?.error || 'Submission failed',
        code: errorResult?.code,
      }
    }

    const result = await response.json()
    return { success: result.success, error: result.error, score: result.score }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'Network error' }
  }
}
