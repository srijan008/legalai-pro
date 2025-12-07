import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"

export const versionsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        label: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const doc = await prisma.document.findFirst({
        where: {
          id: input.documentId,
          ownerId: ctx.userId as string
        }
      })
      if (!doc || !doc.contentText) {
        throw new Error("Document not found or not analyzed yet")
      }
      const count = await prisma.documentVersion.count({
        where: { documentId: doc.id }
      })
      const label = input.label || `v${count + 1}`
      const version = await prisma.documentVersion.create({
        data: {
          documentId: doc.id,
          label,
          riskScore: doc.riskScore ?? 0,
          diffJson: {
            text: doc.contentText
          }
        }
      })
      return version
    }),
  listByDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      return prisma.documentVersion.findMany({
        where: {
          documentId: input.documentId,
          document: {
            ownerId: ctx.userId as string
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    })
})
