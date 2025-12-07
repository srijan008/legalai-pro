import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"
import { contractGenerateInputSchema } from "@/lib/validators/contracts"
import { generateContractMarkdownWithGemini } from "@/server/ai/gemini-contract"

export const contractsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.contract.findMany({
      where: { ownerId: ctx.userId as string },
      orderBy: { createdAt: "desc" }
    })
  }),
  generate: protectedProcedure
    .input(contractGenerateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const markdown = await generateContractMarkdownWithGemini(input)
      const contract = await prisma.contract.create({
        data: {
          ownerId: ctx.userId as string,
          title: input.title,
          type: input.type,
          jurisdiction: input.jurisdiction,
          contentMarkdown: markdown,
          generatedFrom: input.description
        }
      })
      return contract
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return prisma.contract.findFirst({
        where: {
          id: input.id,
          ownerId: ctx.userId as string
        }
      })
    })
})
