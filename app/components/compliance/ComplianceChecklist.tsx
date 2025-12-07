type Finding = {
  standard: string
  passed: boolean
  issues: string[]
}

type Props = {
  findings: Finding[]
}

export default function ComplianceChecklist({ findings }: Props) {
  if (findings.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No compliance checks run yet.
      </div>
    )
  }
  return (
    <div className="space-y-3">
      {findings.map((finding, idx) => (
        <div key={idx} className="border rounded-lg p-3 bg-white">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs font-semibold uppercase">
              {finding.standard}
            </div>
            <div
              className={`text-xs px-2 py-0.5 rounded-full ${
                finding.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {finding.passed ? "Compliant" : "Issues found"}
            </div>
          </div>
          {!finding.passed && (
            <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
              {finding.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
