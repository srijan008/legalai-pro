import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro"
})

export async function generateContractMarkdownWithGemini(args: {
  title: string
  type: string
  jurisdiction: string
  description: string
}) {
  const prompt = `
You are a legal contract drafting engine.
Generate a clear, formal contract in Markdown.
Use numbered clauses and section headings.
Jurisdiction: ${args.jurisdiction}
Type: ${args.type}
Title: ${args.title}

Create the contract based on this description:
${args.description}

Output only Markdown.
`
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
