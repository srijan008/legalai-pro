export type DiffChunk = {
  type: "equal" | "added" | "removed"
  text: string
}

export function diffLines(a: string, b: string): DiffChunk[] {
  const aLines = a.split("\n")
  const bLines = b.split("\n")
  const chunks: DiffChunk[] = []
  let i = 0
  let j = 0
  while (i < aLines.length && j < bLines.length) {
    if (aLines[i] === bLines[j]) {
      chunks.push({ type: "equal", text: aLines[i] })
      i++
      j++
    } else if (!bLines.includes(aLines[i])) {
      chunks.push({ type: "removed", text: aLines[i] })
      i++
    } else if (!aLines.includes(bLines[j])) {
      chunks.push({ type: "added", text: bLines[j] })
      j++
    } else {
      chunks.push({ type: "removed", text: aLines[i] })
      chunks.push({ type: "added", text: bLines[j] })
      i++
      j++
    }
  }
  while (i < aLines.length) {
    chunks.push({ type: "removed", text: aLines[i] })
    i++
  }
  while (j < bLines.length) {
    chunks.push({ type: "added", text: bLines[j] })
    j++
  }
  return chunks
}
