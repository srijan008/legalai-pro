import Shell from "@/components/layout/Shell"
import { prisma } from "@/server/db"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

export default async function ContractPage({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id }
  })
  if (!contract) notFound()
  return (
    <Shell>
      <div className="max-w-3xl mx-auto py-10 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{contract.title}</h1>
            <div className="text-xs text-gray-600 mt-1">
              {contract.type} · {contract.jurisdiction}
            </div>
          </div>
          <Link
            href={`/smart-contracts/generate/${contract.id}`}
            className="px-3 py-1 bg-gray-900 text-white rounded text-xs"
          >
            Generate Smart Contract
          </Link>
        </div>
        <div className="bg-white border rounded-xl p-6 prose prose-sm max-w-none">
          <ReactMarkdown>{contract.contentMarkdown}</ReactMarkdown>
        </div>
      </div>
    </Shell>
  )
}
