import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full bg-white border rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold">LegalAI Pro</h1>

        <p className="text-sm text-gray-600">
          Analyze, explain, and generate legal documents with AI-powered insights.
        </p>

        {/* Demo credentials section */}
        <div className="bg-gray-100 p-4 rounded-lg border text-sm">
          <h2 className="font-semibold mb-2">Demo Login Credentials</h2>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>admin@example.com</span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="font-medium">Password:</span>
            <span>admin123</span>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Use these credentials to sign in to the demo environment.
          </p>
        </div>

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
