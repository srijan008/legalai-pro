import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"
import { getBufferFromGridFS } from "@/server/storage/gridfs"
import { extractDocumentText } from "@/server/ocr/extract"
import { splitIntoClauses } from "@/server/ocr/clauses"

export const parserRouter = createTRPCRouter({
  parse: protectedProcedure
    .input(
      z.object({
        documentId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const doc = await prisma.document.findFirst({
        where: { id: input.documentId, ownerId: ctx.userId }
      })

      if (!doc) throw new Error("Document not found")
      if (!doc.fileId) throw new Error("Document file not found")

      const buffer = await getBufferFromGridFS(doc.fileId)

      const text = await extractDocumentText(buffer, doc.mimeType)
      const clauses = splitIntoClauses(text)

      const prismaClauses = clauses.map(c => ({
        index: c.index,
        text: c.text,
        documentId: doc.id
      }))

      await prisma.clause.deleteMany({
        where: { documentId: doc.id }
      })

      await prisma.clause.createMany({
        data: prismaClauses
      })

      await prisma.document.update({
        where: { id: doc.id },
        data: {
          contentText: text,
          status: "PARSED"
        }
      })

      return { text, clauses }
    })
})
