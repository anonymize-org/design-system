"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "sds:fixed sds:inset-0 sds:z-50 sds:bg-black/50 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "sds:fixed sds:z-50 sds:flex sds:flex-col sds:gap-4 sds:bg-background sds:shadow-lg sds:transition sds:ease-in-out sds:data-[state=closed]:animate-out sds:data-[state=closed]:duration-300 sds:data-[state=open]:animate-in sds:data-[state=open]:duration-500",
          side === "right" &&
            "sds:inset-y-0 sds:right-0 sds:h-full sds:w-3/4 sds:border-l sds:data-[state=closed]:slide-out-to-right sds:data-[state=open]:slide-in-from-right sds:sm:max-w-sm",
          side === "left" &&
            "sds:inset-y-0 sds:left-0 sds:h-full sds:w-3/4 sds:border-r sds:data-[state=closed]:slide-out-to-left sds:data-[state=open]:slide-in-from-left sds:sm:max-w-sm",
          side === "top" &&
            "sds:inset-x-0 sds:top-0 sds:h-auto sds:border-b sds:data-[state=closed]:slide-out-to-top sds:data-[state=open]:slide-in-from-top",
          side === "bottom" &&
            "sds:inset-x-0 sds:bottom-0 sds:h-auto sds:border-t sds:data-[state=closed]:slide-out-to-bottom sds:data-[state=open]:slide-in-from-bottom",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="sds:absolute sds:top-4 sds:right-4 sds:rounded-xs sds:opacity-70 sds:ring-offset-background sds:transition-opacity sds:hover:opacity-100 sds:focus:ring-2 sds:focus:ring-ring sds:focus:ring-offset-2 sds:focus:outline-hidden sds:disabled:pointer-events-none sds:data-[state=open]:bg-secondary">
            <XIcon className="sds:size-4" />
            <span className="sds:sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("sds:flex sds:flex-col sds:gap-1.5 sds:p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("sds:mt-auto sds:flex sds:flex-col sds:gap-2 sds:p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("sds:font-semibold sds:text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("sds:text-sm sds:text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
