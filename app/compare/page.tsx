import Shell from "@/app/components/layout/Shell"
import { prisma } from "@/server/db"
import { diffLines } from "@/lib/utils/diff"

export default async function ComparePage() {
  const versions = await prisma.documentVersion.findMany({
    orderBy: { createdAt: "desc" },
    take: 2,
    include: { document: true }
  })

  if (versions.length < 2) {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-xl font-semibold mb-4">Compare Versions</h1>
          <p className="text-sm text-gray-600">
            Save at least two versions of a document to compare changes.
          </p>
        </div>
      </Shell>
    )
  }

  const [v1, v2] = versions
  const v1Text = (v1.diffJson as any)?.text || ""
  const v2Text = (v2.diffJson as any)?.text || ""
  const diff = diffLines(v1Text, v2Text)

  return (
    <Shell>
      <div className="max-w-5xl mx-auto py-10 space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Compare Versions</h1>
          <div className="text-xs text-gray-600">
            {v1.document.title} · {v1.label} → {v2.label}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-white border rounded-xl p-3 space-y-1">
            {diff.map((chunk, idx) =>
              chunk.type === "removed" ? (
                <div key={idx} className="bg-red-50 line-through text-red-700">
                  {chunk.text}
                </div>
              ) : chunk.type === "equal" ? (
                <div key={idx}>{chunk.text}</div>
              ) : null
            )}
          </div>
          <div className="bg-white border rounded-xl p-3 space-y-1">
            {diff.map((chunk, idx) =>
              chunk.type === "added" ? (
                <div key={idx} className="bg-green-50 text-green-700">
                  {chunk.text}
                </div>
              ) : chunk.type === "equal" ? (
                <div key={idx}>{chunk.text}</div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </Shell>
  )
}
