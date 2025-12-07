import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"

export const documentsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.document.findMany({
      where: { ownerId: ctx.userId as string },
      orderBy: { createdAt: "desc" }
    })
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      return prisma.document.findFirst({
        where: {
          id: input.id,
          ownerId: ctx.userId as string
        },
        include: {
          clauses: true
        }
      })
    })
})
