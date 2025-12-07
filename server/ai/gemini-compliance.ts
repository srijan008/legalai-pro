import { GoogleGenerativeAI } from "@google/generative-ai"
import { getComplianceDescription } from "@/lib/compliance/rules"

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string).getGenerativeModel({
  model: "gemini-1.5-pro"
})

export async function runComplianceCheck(text: string, standard: string) {
  const desc = getComplianceDescription(standard)
  const prompt = `
You are a compliance auditing engine.
Analyze the document for the following compliance standard: ${standard}.
Instructions: ${desc}
Return output as JSON with fields:
- compliant: boolean
- missingPoints: string[]
- suggestions: string[]
- summary: string

Document:
${text}
`
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
