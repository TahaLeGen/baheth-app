"use client"

import * as React from "react"
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastProvider,
} from "@/components/ui/toast"

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "success" | "destructive" | "warning" | "info"
  duration?: number
  position?: ToastPosition
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const duration = props.duration ?? 3000
    setToasts((prev) => [...prev, props])
    setTimeout(() => setToasts((prev) => prev.slice(1)), duration)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {/* On regroupe les toasts par position */}
        {(["top-left", "top-right", "bottom-left", "bottom-right"] as ToastPosition[]).map(
          (pos) => {
            const toastsByPos = toasts.filter((t) => (t.position ?? "bottom-right") === pos)
            if (!toastsByPos.length) return null
            return (
              <ToastViewport key={pos} position={pos}>
                {toastsByPos.map((t, i) => (
                  <Toast key={i} variant={t.variant}>
                    {t.title && <ToastTitle>{t.title}</ToastTitle>}
                    {t.description && <ToastDescription>{t.description}</ToastDescription>}
                  </Toast>
                ))}
              </ToastViewport>
            )
          }
        )}
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within <ToastContextProvider>")
  return ctx
}
