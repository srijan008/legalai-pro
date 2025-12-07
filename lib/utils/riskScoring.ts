export function computeRiskScore(risks: { severity: string }[]) {
  if (risks.length === 0) return 0
  let total = 0
  for (const r of risks) {
    if (r.severity === "LOW") total += 1
    else if (r.severity === "MEDIUM") total += 2
    else if (r.severity === "HIGH") total += 3
    else if (r.severity === "CRITICAL") total += 4
  }
  const max = risks.length * 4
  return Math.round((total / max) * 100)
}
