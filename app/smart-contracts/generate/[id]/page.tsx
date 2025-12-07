import Shell from "@/app/components/layout/Shell"
import { prisma } from "@/server/db"
import { notFound } from "next/navigation"
import GenerateClient from "./GenerateClient"

export default async function GenerateSmartContract({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id }
  })
  if (!contract) notFound()
  return (
    <Shell>
      <GenerateClient contractId={params.id} contractTitle={contract.title} />
    </Shell>
  )
}
