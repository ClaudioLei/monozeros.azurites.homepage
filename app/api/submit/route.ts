import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Backend endpoint for assessment submission
    // Expected data format:
    // {
    //   contact: { company, firstName, lastName, role, email, phone? },
    //   companyProfile: { industry, employees, locations, countries, internalItTeam, complianceDrivers },
    //   xlsxAnswers: [{ cellResponse, cellQuantity, cellComment, response, quantity?, comment? }],
    //   final: { message?, privacyAccepted }
    // }
    
    const backendUrl = process.env.BACKEND_URL
    if (!backendUrl) {
      // If no backend is configured, return an error
      // This is not a mock success - it's a clear indication that backend is missing
      return NextResponse.json(
        { 
          success: false, 
          error: 'Submit requires backend implementation' 
        },
        { status: 501 }
      )
    }
    
    // In production, call your backend API:
    const response = await fetch(`${backendUrl}/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorResult = await response.json().catch(() => null)
      // If the backend returns an error, we forward it
      return NextResponse.json(
        errorResult || {
          success: false,
          error: `Backend error: ${response.statusText}`
        },
        { status: response.status }
      )
    }
    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request data'
      },
      { status: 400 }
    )
  }
}
