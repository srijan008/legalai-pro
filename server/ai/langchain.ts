import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"

const llmLowTemp = new ChatOpenAI({
  modelName: "gpt-4.1",
  temperature: 0.1
})

const llmMediumTemp = new ChatOpenAI({
  modelName: "gpt-4.1",
  temperature: 0.3
})

const riskAnalysisPrompt = PromptTemplate.fromTemplate(`
You are a legal risk analysis engine.
Analyze the following contract text and return a JSON array.
Each item must have: clauseIndex, category, severity (LOW|MEDIUM|HIGH|CRITICAL), explanation, suggestedChange.

Contract text:
{contractText}
`)

const contractGeneratorPrompt = PromptTemplate.fromTemplate(`
You are a contract drafting assistant.
Generate a contract in Markdown with clear headings and numbered clauses.
Jurisdiction: {jurisdiction}
Type: {type}
Description: {description}
`)

export async function analyzeRisks(contractText: string) {
  const chain = riskAnalysisPrompt.pipe(llmLowTemp).pipe(new StringOutputParser())
  const result = await chain.invoke({ contractText })
  return result
}

export async function generateContractMarkdown(args: {
  jurisdiction: string
  type: string
  description: string
}) {
  const chain = contractGeneratorPrompt.pipe(llmMediumTemp).pipe(new StringOutputParser())
  const result = await chain.invoke({
    jurisdiction: args.jurisdiction,
    type: args.type,
    description: args.description
  })
  return result
}
