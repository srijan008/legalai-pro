import { createTRPCRouter } from "./trpc"
import { documentsRouter } from "./routers/documents"
import { analysisRouter } from "./routers/analysis"
import { contractsRouter } from "./routers/contracts"
import { smartRouter } from "./routers/smart"
import { versionsRouter } from "./routers/versions"
import { complianceRouter } from "./routers/compliance"

export const appRouter = createTRPCRouter({
  documents: documentsRouter,
  analysis: analysisRouter,
  contracts: contractsRouter,
  smart: smartRouter,
  versions: versionsRouter,
  compliance: complianceRouter
})

export type AppRouter = typeof appRouter
