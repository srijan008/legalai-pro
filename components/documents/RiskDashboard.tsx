type Props = {
  score: number
}

export default function RiskDashboard({ score }: Props) {
  const safe = Math.min(100, Math.max(0, score))
  const color =
    safe < 30 ? "bg-green-500" : safe < 70 ? "bg-yellow-500" : "bg-red-500"
  const label = safe < 30 ? "Low" : safe < 70 ? "Medium" : "High"
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Risk score</span>
        <span>{safe}/100</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${safe}%` }}
        />
      </div>
      <div className="text-xs text-gray-700">
        Overall risk level: <span className="font-semibold">{label}</span>
      </div>
    </div>
  )
}
