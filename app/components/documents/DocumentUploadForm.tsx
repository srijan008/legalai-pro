"use client"

import { useState } from "react"

export default function DocumentUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setError("Select a file")
      return
    }
    setError(null)
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || "Upload failed")
      } else {
        window.location.href = `/documents/${json.id}`
      }
    } catch (err) {
      setError("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm"
      />
      {error && <div className="text-xs text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-gray-900 text-white text-sm"
      >
        {loading ? "Uploading..." : "Upload and analyze"}
      </button>
    </form>
  )
}
