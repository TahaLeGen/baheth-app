"use client"

import { ToastContextProvider } from "@/hooks/use-toast"

export function Toaster({
  children,
  position = "bottom-right",
}: {
  children: React.ReactNode
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
}) {
  return (
    <ToastContextProvider>
      {children}
    </ToastContextProvider>
  )
}
