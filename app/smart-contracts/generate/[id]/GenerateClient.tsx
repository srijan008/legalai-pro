"use client"

import { trpc } from "@/utils/trpc"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GenerateClient({ contractId, contractTitle }: { contractId: string; contractTitle: string }) {
  const router = useRouter()
  const [template, setTemplate] = useState("ESCROW")

  const mutation = trpc.smart.generateFromContract.useMutation({
    onSuccess(data) {
      router.push(`/smart-contracts/${data.id}`)
    }
  })

  function submit() {
    mutation.mutate({
      contractId,
      template: template as any
    })
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-xl font-semibold">Smart Contract for {contractTitle}</h1>
      <select
        className="w-full border rounded px-3 py-2 text-sm"
        value={template}
        onChange={e => setTemplate(e.target.value)}
      >
        <option value="ESCROW">Escrow Contract</option>
      </select>
      <button
        onClick={submit}
        className="px-4 py-2 bg-gray-900 text-white rounded text-sm"
      >
        Generate Smart Contract
      </button>
    </div>
  )
}
