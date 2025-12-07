import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"
import { runComplianceCheck } from "@/server/ai/gemini-compliance"

export const complianceRouter = createTRPCRouter({
  run: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        standards: z.array(z.enum(["GDPR", "CCPA", "SOC2", "HIPAA", "PCI_DSS"]))
      })
    )
    .mutation(async ({ input, ctx }) => {
      const doc = await prisma.document.findFirst({
        where: { id: input.documentId, ownerId: ctx.userId as string }
      })
      if (!doc || !doc.contentText) throw new Error("Document not ready")

      const results: Record<string, any> = {}

      for (const standard of input.standards) {
        const raw = await runComplianceCheck(doc.contentText, standard)
        results[standard] = JSON.parse(raw)
      }

      await prisma.complianceCheck.create({
        data: {
          documentId: doc.id,
          standards: input.standards as any,
          resultJson: results
        }
      })

      return results
    }),

  history: protectedProcedure
    .input(
      z.object({
        documentId: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      return prisma.complianceCheck.findMany({
        where: {
          documentId: input.documentId,
          document: {
            ownerId: ctx.userId as string
          }
        },
        orderBy: { createdAt: "desc" }
      })
    })
})
