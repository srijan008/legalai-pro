import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"

export const documentsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.document.findMany({
      where: { ownerId: ctx.userId as string },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true
      }
    })
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return prisma.document.findFirst({
        where: {
          id: input.id,
          ownerId: ctx.userId as string
        },
        select: {
          id: true,
          title: true,
          status: true,
          riskScore: true,
          riskSummaryJson: true,
          contentText: true,
          clauses: {
            select: {
              id: true,
              index: true,
              heading: true,
              text: true,
              explanation: true,
              riskLevel: true
            }
          }
        }
      })
    })
})
