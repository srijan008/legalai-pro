"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/documents/upload", label: "Upload" },
  { href: "/contracts/new", label: "Generate contract" },
  { href: "/compare", label: "Compare versions" }
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-60 border-r bg-white h-screen flex flex-col">
      <div className="px-4 py-4 text-lg font-semibold">LegalAI Pro</div>
      <nav className="flex-1 px-2 space-y-1">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded text-sm ${
              pathname.startsWith(link.href)
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
