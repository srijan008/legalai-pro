import Tesseract from "tesseract.js"

export async function extractTextWithTesseract(buffer: Buffer) {
  const result = await Tesseract.recognize(buffer, "eng")
  return result.data.text || ""
}
