import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract"

const client = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

export async function extractTextWithTextract(buffer: Buffer) {
  const command = new AnalyzeDocumentCommand({
    Document: { Bytes: buffer },
    FeatureTypes: ["TABLES", "FORMS"]
  })
  const result = await client.send(command)
  const blocks = result.Blocks || []
  const lines = blocks
    .filter(b => b.BlockType === "LINE" && b.Text)
    .map(b => b.Text)
  return lines.join("\n")
}
