import Shell from "@/components/layout/Shell"
import ContractGeneratorForm from "@/components/contracts/ContractGeneratorForm"

export default function NewContractPage() {
  return (
    <Shell>
      <div className="max-w-2xl mx-auto py-10 space-y-4">
        <h1 className="text-xl font-semibold">Generate Contract</h1>
        <p className="text-sm text-gray-600">
          Enter details and Gemini will generate a contract draft.
        </p>
        <ContractGeneratorForm />
      </div>
    </Shell>
  )
}
