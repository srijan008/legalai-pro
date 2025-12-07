import { ComplianceStandard } from "@prisma/client"

export type ComplianceFinding = {
  standard: ComplianceStandard
  passed: boolean
  issues: string[]
}

export function runComplianceChecks(text: string, standards: ComplianceStandard[]): ComplianceFinding[] {
  const findings: ComplianceFinding[] = []
  const lower = text.toLowerCase()
  for (const standard of standards) {
    if (standard === "GDPR") {
      const issues: string[] = []
      if (!lower.includes("data controller")) {
        issues.push("Missing reference to data controller responsibilities")
      }
      if (!lower.includes("data processing")) {
        issues.push("Missing explicit data processing clause")
      }
      findings.push({
        standard,
        passed: issues.length === 0,
        issues
      })
    } else if (standard === "CCPA") {
      const issues: string[] = []
      if (!lower.includes("california")) {
        issues.push("No explicit California consumer rights language")
      }
      findings.push({
        standard,
        passed: issues.length === 0,
        issues
      })
    } else if (standard === "SOC2") {
      const issues: string[] = []
      findings.push({
        standard,
        passed: issues.length === 0,
        issues
      })
    } else if (standard === "HIPAA") {
      const issues: string[] = []
      if (!lower.includes("protected health information") && !lower.includes("phi")) {
        issues.push("No explicit language around protected health information (PHI)")
      }
      findings.push({
        standard,
        passed: issues.length === 0,
        issues
      })
    } else if (standard === "PCI_DSS") {
      const issues: string[] = []
      if (!lower.includes("cardholder data")) {
        issues.push("No mention of cardholder data and payment security")
      }
      findings.push({
        standard,
        passed: issues.length === 0,
        issues
      })
    }
  }
  return findings
}
