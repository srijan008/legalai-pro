"use client"

import { useState } from "react"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/navigation"

export default function ContractGeneratorForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [type, setType] = useState("SERVICE")
  const [jurisdiction, setJurisdiction] = useState("US")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  const mutation = trpc.contracts.generate.useMutation({
    onSuccess(data) {
      router.push(`/contracts/${data.id}`)
    },
    onError(err) {
      setError(err.message)
    }
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    mutation.mutate({
      title,
      type: type as any,
      jurisdiction: jurisdiction as any,
      description
    })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        className="w-full border rounded px-3 py-2 text-sm"
        placeholder="Contract title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <select
        className="w-full border rounded px-3 py-2 text-sm"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="SERVICE">Service Agreement</option>
        <option value="NDA">Non-Disclosure Agreement</option>
        <option value="EMPLOYMENT">Employment Agreement</option>
        <option value="PARTNERSHIP">Partnership Agreement</option>
        <option value="CUSTOM">Custom Contract</option>
      </select>
      <select
        className="w-full border rounded px-3 py-2 text-sm"
        value={jurisdiction}
        onChange={e => setJurisdiction(e.target.value)}
      >
        <option value="US">US</option>
        <option value="UK">UK</option>
        <option value="EU">EU</option>
        <option value="OTHER">Other</option>
      </select>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm h-32"
        placeholder="Describe the agreement in plain English"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {error && <div className="text-xs text-red-600">{error}</div>}
      <button
        type="submit"
        className="px-4 py-2 bg-gray-900 rounded text-white text-sm"
      >
        Generate
      </button>
    </form>
  )
}
