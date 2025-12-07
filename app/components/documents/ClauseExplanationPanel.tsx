type Clause = {
  id: string
  index: number
  text: string
  explanation?: string | null
  riskLevel?: string | null
}

type Risk = {
  clauseIndex: number
  category: string
  severity: string
  explanation: string
  suggestedChange: string
}

type Props = {
  clauses: Clause[]
  selectedIndex: number | null
  risks: Risk[]
}

export default function ClauseExplanationPanel({ clauses, selectedIndex, risks }: Props) {
  const clause = selectedIndex !== null ? clauses.find(c => c.index === selectedIndex) : null
  const risk = selectedIndex !== null ? risks.find(r => r.clauseIndex === selectedIndex) : null
  if (!clause) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Select a clause to view analysis.
      </div>
    )
  }
  return (
    <div className="p-4 space-y-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">
        Clause {clause.index + 1}
      </div>
      <div className="text-sm whitespace-pre-wrap">{clause.text}</div>
      {risk && (
        <div className="border-t pt-3 space-y-2">
          <div className="text-xs font-semibold text-gray-500">
            Category
          </div>
          <div className="text-sm">{risk.category} · {risk.severity}</div>
          <div className="text-xs font-semibold text-gray-500">
            Explanation
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {risk.explanation}
          </div>
          <div className="text-xs font-semibold text-gray-500">
            Suggested change
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {risk.suggestedChange}
          </div>
        </div>
      )}
    </div>
  )
}
