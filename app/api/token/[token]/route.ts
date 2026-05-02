import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  // Backend endpoint for token validation
  // Expected response format:
  // { valid: boolean, status: 'active' | 'expired' | 'submitted' | 'revoked' | 'invalid', company?: string }
   
  const backendUrl = process.env.BACKEND_URL
  if (!backendUrl) {
    // If no backend is configured, return 501 to indicate that the backend is required
    return NextResponse.json(
      { 
        valid: false, 
        status: 'invalid',
        error: 'Token validation requires backend implementation' 
      },
      { status: 501 }
    )
  }
  
  // In production, call your backend API:
  try {
    const response = await fetch(`${backendUrl}/api/token/${token}`)
    if (!response.ok) {
      const errorResult = await response.json().catch(() => null)
      return NextResponse.json(
        { 
          valid: false, 
          status: errorResult?.status || (response.status === 410 ? 'expired' : 'invalid')
        },
        { status: response.status }
      )
    }
    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json(
      { 
        valid: false, 
        status: 'invalid',
        error: 'Failed to validate token' 
      },
      { status: 500 }
    )
  }
}
