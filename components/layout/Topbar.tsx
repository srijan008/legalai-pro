"use client"

import { useSession, signOut } from "next-auth/react"

export default function Topbar() {
  const { data } = useSession()
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-white">
      <div className="text-sm font-medium text-gray-700">
        AI-powered legal document assistant
      </div>
      <div className="flex items-center gap-3">
        {data?.user && (
          <div className="text-xs text-right">
            <div className="font-semibold">{data.user.name}</div>
            <div className="text-gray-500">{data.user.email}</div>
          </div>
        )}
        {data?.user ? (
          <button
            onClick={() => signOut()}
            className="px-3 py-1 rounded bg-gray-900 text-white text-xs"
          >
            Sign out
          </button>
        ) : null}
      </div>
    </header>
  )
}
