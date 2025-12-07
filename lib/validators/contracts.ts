import { z } from "zod"

export const contractGenerateInputSchema = z.object({
  title: z.string().min(3),
  type: z.enum(["SERVICE", "NDA", "EMPLOYMENT", "PARTNERSHIP", "CUSTOM"]),
  jurisdiction: z.enum(["US", "UK", "EU", "OTHER"]),
  description: z.string().min(10)
})

export type ContractGenerateInput = z.infer<typeof contractGenerateInputSchema>
