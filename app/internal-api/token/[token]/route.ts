import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    return NextResponse.json(
      {
        valid: false,
        status: 'invalid',
        error: 'Token validation requires backend implementation',
      },
      { status: 501 }
    )
  }

  try {
    const response = await fetch(`${backendUrl}/api/token/${encodeURIComponent(token)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorResult = await response.json().catch(() => null)
      return NextResponse.json(
        {
          valid: false,
          status: errorResult?.status || (response.status === 410 ? 'expired' : 'invalid'),
          error: errorResult?.error,
        },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json(), { status: response.status })
  } catch (error) {
    console.error('Internal token validation error:', error)
    return NextResponse.json(
      {
        valid: false,
        status: 'invalid',
        error: 'Failed to validate token',
      },
      { status: 500 }
    )
  }
}
