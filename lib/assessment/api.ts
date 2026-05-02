export async function validateToken(token: string): Promise<{
  valid: boolean
  status: 'active' | 'expired' | 'used' | 'invalid'
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
      return { success: false, error: 'Submission failed' }
    }

    const result = await response.json()
    return { success: result.success, error: result.error }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'Network error' }
  }
}