"use client"

import { trpc } from "@/utils/trpc"
import DashboardSection from "@/app/components/dashboard/DashboardSection"

export default function DashboardClient() {
  const docs = trpc.documents.list.useQuery()
  const contracts = trpc.contracts.generate.useMutation()
  const smartContracts = trpc.smart.generateFromContract.useMutation()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardSection
          title="Documents"
          href="/documents/upload"
          count={docs.data?.length ?? 0}
          items={
            docs.data?.map(d => ({
              id: d.id,
              title: d.title,
              href: `/documents/${d.id}`,
              subtitle: d.status
            })) ?? []
          }
        />
        <DashboardSection
          title="Contracts"
          href="/contracts/new"
          count={0}
          items={[]}
        />
        <DashboardSection
          title="Smart Contracts"
          href="/contracts/new"
          count={0}
          items={[]}
        />
      </div>
    </div>
  )
}
