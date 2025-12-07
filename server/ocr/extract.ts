import { extractTextFromPDF } from "./pdf"
import { extractTextWithTesseract } from "./tesseract"

export async function extractDocumentText(buffer: Buffer, mimeType: string) {
  if (mimeType.includes("pdf")) {
    const pdfText = await extractTextFromPDF(buffer)
    if (pdfText.trim().length > 50) return pdfText
    const ocrText = await extractTextWithTesseract(buffer)
    return ocrText
  }
  if (mimeType.startsWith("image/")) {
    const ocrText = await extractTextWithTesseract(buffer)
    return ocrText
  }
  return buffer.toString("utf8")
}
