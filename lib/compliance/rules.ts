export const complianceStandards = [
  "GDPR",
  "CCPA",
  "SOC2",
  "HIPAA",
  "PCI_DSS"
]

export function getComplianceDescription(standard: string) {
  if (standard === "GDPR")
    return "Check if the document includes privacy rights, data processing obligations, data controller responsibilities, retention rules, and lawful basis for processing."
  if (standard === "CCPA")
    return "Check if the document includes consumer rights, opt-out clauses, sale of information, data deletion requests, and notice obligations."
  if (standard === "SOC2")
    return "Check if the document outlines controls related to security, availability, processing integrity, confidentiality, and privacy."
  if (standard === "HIPAA")
    return "Check if the document regulates PHI handling, business associate agreements, permitted uses, disclosures, and security safeguards."
  if (standard === "PCI_DSS")
    return "Check if the document covers cardholder data protection, access limitations, encryption, network monitoring, and incident response."
  return ""
}
