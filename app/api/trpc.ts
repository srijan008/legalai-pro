import { initTRPC, TRPCError } from "@trpc/server"
import { ZodError } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export type Context = {
  userId: string | null
}

export async function createContext(): Promise<Context> {
  const session = await getServerSession(authOptions)
  return {
    userId: session?.user?.id ?? null
  }
}

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    }
  }
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({ ctx: { userId: ctx.userId } })
})
