import { Suspense } from "react"
import Shell from "@/app/components/layout/Shell"
import DocumentClient from "./DocumentClient"
import ComplianceForm from "@/app/components/compliance/ComplianceForm"

type Props = {
  params: { id: string }
}

export default function DocumentPage({ params }: Props) {
  return (
    <Shell>
      <Suspense fallback={<div className="p-6">Loading document...</div>}>
        <DocumentClient documentId={params.id} />
      </Suspense>
      <div className="border-t p-6">
        <h2 className="text-lg font-semibold mb-3">Compliance Check</h2>
        <ComplianceForm documentId={params.id} />
      </div>
    </Shell>
  )
}
