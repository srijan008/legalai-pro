import Shell from "@/components/layout/Shell"
import { prisma } from "@/server/db"
import { notFound } from "next/navigation"

export default async function SmartContractPage({ params }: { params: { id: string } }) {
  const smart = await prisma.smartContract.findUnique({
    where: { id: params.id }
  })
  if (!smart) notFound()
  return (
    <Shell>
      <div className="max-w-3xl mx-auto py-10 space-y-4">
        <h1 className="text-xl font-semibold">{smart.title} Smart Contract</h1>
        <pre className="bg-black text-green-400 text-xs p-4 rounded-xl overflow-x-auto">
          {smart.solidityCode}
        </pre>
      </div>
    </Shell>
  )
}
