import Shell from "@/app/components/layout/Shell"
import DocumentUploadForm from "@/app/components/documents/DocumentUploadForm"

export default function UploadPage() {
  return (
    <Shell>
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-xl font-semibold mb-4">Upload legal document</h1>
        <p className="text-sm text-gray-600 mb-6">
          Supported formats: PDF, DOCX, TXT. Up to 50 pages.
        </p>
        <DocumentUploadForm />
      </div>
    </Shell>
  )
}
