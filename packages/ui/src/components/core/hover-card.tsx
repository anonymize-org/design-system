"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "sds:z-50 sds:w-64 sds:origin-(--radix-hover-card-content-transform-origin) sds:rounded-md sds:border sds:bg-popover sds:p-4 sds:text-popover-foreground sds:shadow-md sds:outline-hidden sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=closed]:zoom-out-95 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0 sds:data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
