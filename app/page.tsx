import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to LegalAI Pro</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Use the following demo credentials to log in:
      </p>

      <div className="bg-white border rounded-xl shadow p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3">Demo Login Credentials</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>admin@example.com</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Password:</span>
            <span>admin123</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          These credentials were generated using the Prisma seed script.
        </p>
      </div>
    </div>
  )
}

