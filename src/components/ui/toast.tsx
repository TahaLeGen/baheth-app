"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"
import { ToastPosition } from "@/hooks/use-toast"

const toastVariants = cva(
  "group relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 pr-6 shadow-md transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border",
        success:
          "bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)] [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        destructive:
          "bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)] [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        warning:
          "bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)] [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        info:
          "bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)] [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const icons = {
  success: <CheckCircle2 className="h-5 w-5 flex-shrink-0" />,
  destructive: <XCircle className="h-5 w-5 flex-shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
  info: <Info className="h-5 w-5 flex-shrink-0" />,
  default: null,
}

export const ToastProvider = ToastPrimitives.Provider

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: ToastPosition
  }
>(({ className, position = "bottom-right", ...props }, ref) => {
  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={`fixed z-[100] flex max-h-screen flex-col-reverse p-4 space-y-2 space-y-reverse ${positionClasses[position]} ${className ?? ""}`}
      {...props}
    />
  )
})

ToastViewport.displayName = ToastPrimitives.Viewport.displayName

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    {icons[variant || "default"]}
    <div className="flex flex-col text-sm">{children}</div>
  </ToastPrimitives.Root>
))
Toast.displayName = ToastPrimitives.Root.displayName

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-tight", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-xs opacity-90 mt-1", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

