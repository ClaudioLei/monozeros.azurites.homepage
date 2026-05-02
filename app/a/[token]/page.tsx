import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { TokenAssessmentClient } from '@/components/assessment/token-assessment-client'

export const metadata: Metadata = {
  title: 'MDR Assessment',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

interface TokenPageProps {
  params: Promise<{ token: string }>
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { token } = await params

  const validateToken = async (token: string): Promise<{
    valid: boolean
    status: 'active' | 'expired' | 'used' | 'invalid'
    company?: string
  }> => {
    const backendUrl = process.env.BACKEND_URL

    if (!backendUrl) {
      return { valid: false, status: 'invalid' }
    }

    try {
      const response = await fetch(`${backendUrl}/api/token/${encodeURIComponent(token)}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        return { valid: false, status: 'invalid' }
      }

      return response.json()
    } catch {
      return { valid: false, status: 'invalid' }
    }
  }

  let result: { valid: boolean; status: 'active' | 'expired' | 'used' | 'invalid'; company?: string }
  try {
    result = await validateToken(token)
  } catch {
    return redirect('/invalid-link')
  }

  if (!result.valid) {
    if (result.status === 'expired') {
      return redirect('/expired-link')
    } else if (result.status === 'used') {
      return redirect('/already-submitted')
    } else {
      return redirect('/invalid-link')
    }
  }
  
  return <TokenAssessmentClient token={token} company={result.company || ''} />
}
