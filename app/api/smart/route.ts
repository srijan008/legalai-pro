export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/server/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const contract = await prisma.smartContract.create({
      data: {
        ownerId: body.ownerId,
        title: body.title,
        templateType: body.templateType,
        solidityCode: body.solidityCode,
        abiJson: body.abiJson ?? null,
        network: body.network ?? null,
        deployedAddress: body.deployedAddress ?? null,
        bytecode: body.bytecode ?? null,
        gasEstimation: body.gasEstimation ?? null,
        securityFindingsJson: body.securityFindingsJson ?? null
      }
    })

    return NextResponse.json({ success: true, contract })
  } catch (err) {
    console.error("Smart contract POST error:", err)
    return NextResponse.json({ error: "Smart contract creation failed" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contracts = await prisma.smartContract.findMany({
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ success: true, contracts })
  } catch (err) {
    console.error("Smart contract GET error:", err)
    return NextResponse.json({ error: "Could not fetch contracts" }, { status: 500 })
  }
}
