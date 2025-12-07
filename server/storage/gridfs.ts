import { MongoClient, GridFSBucket, ObjectId } from "mongodb"
const uri = process.env.DATABASE_URL as string

let clientPromise: Promise<MongoClient> | null = null

async function getClient() {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri)
  }
  return clientPromise
}

async function getBucket() {
  const client = await getClient()
  const dbName = new URL(uri).pathname.replace("/", "") || "legalai-pro"
  const db = client.db(dbName)
  const bucket = new GridFSBucket(db, { bucketName: "documents" })
  return bucket
}

export async function uploadBufferToGridFS(buffer: Buffer, filename: string, mimeType: string) {
  const bucket = await getBucket()
  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimeType
  })
  uploadStream.end(buffer)
  return new Promise<string>((resolve, reject) => {
    uploadStream.on("finish", () => {
      resolve(uploadStream.id.toString())
    })
    uploadStream.on("error", err => {
      reject(err)
    })
  })
}

export async function getBufferFromGridFS(fileId: string) {
  const bucket = await getBucket()
  const downloadStream = bucket.openDownloadStream(new ObjectId(fileId))
  const chunks: Buffer[] = []
  return new Promise<Buffer>((resolve, reject) => {
    downloadStream.on("data", chunk => {
      chunks.push(chunk as Buffer)
    })
    downloadStream.on("end", () => {
      resolve(Buffer.concat(chunks))
    })
    downloadStream.on("error", err => {
      reject(err)
    })
  })
}
