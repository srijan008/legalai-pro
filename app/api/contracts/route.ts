export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    return NextResponse.json({
      success: true,
      message: "Contracts API working",
      received: body
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Contracts API online"
  })
}
