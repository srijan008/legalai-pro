export const runtime = "nodejs"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"
import { prisma } from "@/server/db"
import { uploadBufferToGridFS } from "@/server/storage/gridfs"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const formData = await req.formData()
  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mimeType = file.type || "application/octet-stream"
  const fileId = await uploadBufferToGridFS(buffer, file.name, mimeType)
  const doc = await prisma.document.create({
    data: {
      ownerId: session.user.id,
      title: file.name,
      originalName: file.name,
      mimeType,
      fileId,
      status: "UPLOADED"
    }
  })
  return NextResponse.json({ id: doc.id })
}
