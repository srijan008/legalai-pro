"use client"

import { useState } from "react"
import { trpc } from "@/utils/trpc"
import RiskDashboard from "@/components/documents/RiskDashboard"
import ClauseExplanationPanel from "@/components/documents/ClauseExplanationPanel"

type Props = {
  documentId: string
}

export default function DocumentClient({ documentId }: Props) {
  const { data, isLoading } = trpc.documents.getById.useQuery({ id: documentId })
  const analyze = trpc.analysis.analyzeDocument.useMutation({
    onSuccess() {
      window.location.reload()
    }
  })
  const createVersion = trpc.versions.create.useMutation()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (isLoading || !data) {
    return <div className="p-6">Loading...</div>
  }

  const risks = (data.riskSummaryJson as any[]) || []

  async function handleSaveVersion() {
    if (!data.contentText) {
      alert("Run analysis first to have text to version.")
      return
    }
    await createVersion.mutateAsync({
      documentId,
      label: undefined
    })
    alert("Version saved.")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 space-y-4 border-b">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => analyze.mutate({ documentId })}
              className="px-3 py-1 bg-gray-900 text-white rounded text-xs"
            >
              {analyze.isPending ? "Analyzing..." : "Run analysis"}
            </button>
            <button
              onClick={handleSaveVersion}
              className="px-3 py-1 border rounded text-xs"
              disabled={createVersion.isPending}
            >
              {createVersion.isPending ? "Saving..." : "Save version"}
            </button>
          </div>
          <RiskDashboard score={data.riskScore || 0} />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {data.clauses.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedIndex(c.index)}
              className={`w-full text-left px-3 py-2 rounded ${
                selectedIndex === c.index ? "bg-gray-200" : "bg-white"
              }`}
            >
              <div className="text-xs font-semibold">
                Clause {c.index + 1}
              </div>
              <div className="text-xs text-gray-600 line-clamp-2">
                {c.text}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ClauseExplanationPanel
          clauses={data.clauses}
          selectedIndex={selectedIndex}
          risks={risks}
        />
      </div>
    </div>
  )
}
