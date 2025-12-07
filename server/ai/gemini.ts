import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY as string

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro"
})

export async function analyzeTextForRisksWithGemini(contractText: string) {
  const prompt = `
You are a legal risk analysis engine.
Analyze the following contract text and respond with a JSON array.
Each element must have: clauseIndex, category, severity, explanation, suggestedChange.
severity must be one of: "LOW", "MEDIUM", "HIGH", "CRITICAL".
Respond with JSON only, no extra text.

Text:
${contractText}
`
  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  return text
}
