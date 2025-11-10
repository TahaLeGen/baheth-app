"use client"

import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

export function AppLogo() {
  return (
    <Link 
      href="/dashboard" 
      className="flex items-center gap-2 px-2 py-1.5 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Baheth</span>
        <span className="truncate text-xs text-muted-foreground">Research Platform</span>
      </div>
    </Link>
  )
}
