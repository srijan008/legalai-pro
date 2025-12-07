import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"
import { Readable } from "stream"

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

export async function uploadBufferToS3(buffer: Buffer, mimeType: string) {
  const key = `documents/${randomUUID()}`
  const bucket = process.env.AWS_S3_BUCKET as string
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: mimeType
  })
  await s3.send(command)
  return key
}

export async function getObjectFromS3(key: string): Promise<Buffer> {
  const bucket = process.env.AWS_S3_BUCKET as string
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  })
  const res = await s3.send(command)
  const stream = res.Body as Readable
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(chunk as Buffer)
  }
  return Buffer.concat(chunks)
}
