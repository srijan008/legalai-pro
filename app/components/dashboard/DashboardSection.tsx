import Link from "next/link"

type Item = {
  id: string
  title: string
  href: string
  subtitle?: string
}

type Props = {
  title: string
  count: number
  href: string
  items: Item[]
}

export default function DashboardSection({ title, count, href, items }: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-xs text-gray-500">{count} total</div>
        </div>
        <Link
          href={href}
          className="px-3 py-1 text-xs bg-gray-900 text-white rounded"
        >
          New
        </Link>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {items.length === 0 && (
          <div className="text-xs text-gray-500">No items yet</div>
        )}
        {items.slice(0, 5).map(item => (
          <Link
            key={item.id}
            href={item.href}
            className="block border rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
          >
            <div className="font-medium">{item.title}</div>
            {item.subtitle && (
              <div className="text-xs text-gray-500">{item.subtitle}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
