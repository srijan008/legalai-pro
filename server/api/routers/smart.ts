import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"
import { escrowTemplate } from "@/lib/utils/solidityTemplates"

export const smartRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.smartContract.findMany({
      where: { ownerId: ctx.userId as string }
    })
  }),
  generateFromContract: protectedProcedure
    .input(
      z.object({
        contractId: z.string(),
        template: z.enum(["ESCROW"])
      })
    )
    .mutation(async ({ input, ctx }) => {
      const contract = await prisma.contract.findFirst({
        where: { id: input.contractId, ownerId: ctx.userId as string }
      })
      if (!contract) throw new Error("Contract not found")
      let code = ""
      if (input.template === "ESCROW") {
        code = escrowTemplate()
      }
      const smart = await prisma.smartContract.create({
        data: {
          ownerId: ctx.userId as string,
          title: contract.title,
          templateType: input.template,
          solidityCode: code
        }
      })
      return smart
    })
})
