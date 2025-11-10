"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Suspense } from "react"
import { useAuth } from "@/contexts/auth-context"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const role = user?.role || 'researcher'

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <DashboardHeader role={role} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  )
}
