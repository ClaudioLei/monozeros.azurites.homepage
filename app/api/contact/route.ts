import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Backend endpoint for contact form submissions
    // Expected data format:
    // {
    //   name: string,
    //   company: string,
    //   role?: string,
    //   email: string,
    //   phone?: string,
    //   message: string,
    //   assessmentRequest?: boolean
    // }
    
    const backendUrl = process.env.BACKEND_URL
    if (!backendUrl) {
      // If no backend is configured, return an error
      // This is not a mock success - it's a clear indication that backend is missing
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact form requires backend implementation' 
        },
        { status: 501 }
      )
    }
    
    // In production, call your backend API:
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      // If the backend returns an error, we forward it
      return NextResponse.json(
        { 
          success: false, 
          error: `Backend error: ${response.statusText}` 
        },
        { status: response.status }
      )
    }
    return response.json()
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request data'
      },
      { status: 400 }
    )
  }
}