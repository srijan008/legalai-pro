import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { prisma } from "@/server/db"
import { getBufferFromGridFS } from "@/server/storage/gridfs"
import { extractDocumentText } from "@/server/ocr/extract"
import { splitIntoClauses } from "@/server/ocr/clauses"
import { analyzeTextForRisksWithGemini } from "@/server/ai/gemini"
import { computeRiskScore } from "@/lib/utils/riskScoring"

export const analysisRouter = createTRPCRouter({
  analyzeDocument: protectedProcedure
    .input(z.object({ documentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const doc = await prisma.document.findFirst({
        where: { id: input.documentId, ownerId: ctx.userId as string }
      })
      if (!doc || !doc.fileId) {
        throw new Error("Document not found")
      }
      const buffer = await getBufferFromGridFS(doc.fileId)
      const text = await extractDocumentText(buffer, doc.mimeType)
      const clauses = splitIntoClauses(text)
      await prisma.clause.deleteMany({
        where: { documentId: doc.id }
      })
      await prisma.clause.createMany({
        data: clauses.map(c => ({
          documentId: doc.id,
          index: c.index,
          text: c.text
        }))
      })
      const raw = await analyzeTextForRisksWithGemini(text)
      const parsed = JSON.parse(raw)
      const score = computeRiskScore(parsed)
      await prisma.document.update({
        where: { id: doc.id },
        data: {
          status: "ANALYZED",
          contentText: text,
          riskScore: score,
          riskSummaryJson: parsed
        }
      })
      return {
        text,
        clauses,
        risks: parsed,
        riskScore: score
      }
    })
})
