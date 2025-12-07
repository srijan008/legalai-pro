import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full bg-white border rounded-xl p-8 space-y-4">
        <h1 className="text-2xl font-semibold">LegalAI Pro</h1>
        <p className="text-sm text-gray-600">
          Analyze, explain and generate legal documents with AI-powered insights.
        </p>
        <div className="flex gap-3">
          <Link
            href="/auth/signin"
            className="px-4 py-2 rounded bg-gray-900 text-white text-sm"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
