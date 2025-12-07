export function splitIntoClauses(text: string) {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const clauses: { index: number; text: string }[] = []
  let current: string[] = []

  function pushCurrent() {
    if (current.length > 0) {
      const index = clauses.length
      clauses.push({
        index,
        text: current.join(" ")
      })
      current = []
    }
  }

  for (const line of lines) {
    const isHeading = /^[A-Z][A-Z0-9 \-]{3,}$/.test(line)
    const isNumbered = /^(\d+\.|\d+\)|[a-z]\)|[a-z]\.)/.test(line)
    if (isHeading || isNumbered) {
      pushCurrent()
      current.push(line)
    } else {
      current.push(line)
    }
  }

  pushCurrent()
  return clauses
}
