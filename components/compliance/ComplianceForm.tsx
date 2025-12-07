"use client"

import { useState } from "react"
import { trpc } from "@/utils/trpc"

const standardsList = ["GDPR", "CCPA", "SOC2", "HIPAA", "PCI_DSS"] as const

export default function ComplianceForm({ documentId }: { documentId: string }) {
  const [selected, setSelected] = useState<string[]>([])
  const mutation = trpc.compliance.run.useMutation()
  const [results, setResults] = useState<any | null>(null)

  function toggle(s: string) {
    if (selected.includes(s)) {
      setSelected(selected.filter(x => x !== s))
    } else {
      setSelected([...selected, s])
    }
  }

  async function submit() {
    const res = await mutation.mutateAsync({
      documentId,
      standards: selected as any
    })
    setResults(res)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold">Select standards</div>
      <div className="grid grid-cols-2 gap-2">
        {standardsList.map(s => (
          <label key={s} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(s)}
              onChange={() => toggle(s)}
            />
            {s}
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        className="px-3 py-1 bg-gray-900 text-white rounded text-xs"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Checking..." : "Run Compliance"}
      </button>
      {results && (
        <div className="space-y-4 bg-white border rounded-xl p-4">
          {Object.entries(results).map(([standard, r]) => (
            <div key={standard} className="space-y-1">
              <div className="text-sm font-semibold">{standard}</div>
              <div className="text-xs text-gray-600">{r.summary}</div>
              <div className="text-xs">
                <span className="font-semibold">Compliant:</span> {String(r.compliant)}
              </div>
              <div className="text-xs">
                <span className="font-semibold">Missing:</span>{" "}
                {r.missingPoints.join(", ")}
              </div>
              <div className="text-xs">
                <span className="font-semibold">Suggestions:</span>{" "}
                {r.suggestions.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
