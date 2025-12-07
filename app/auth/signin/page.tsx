"use client"

import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    if (res?.error) {
      setError(res.error)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full border rounded px-3 py-2 text-sm"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <div className="text-xs text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-gray-900 text-white text-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
