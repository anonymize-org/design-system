"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "sds:z-50 sds:w-fit sds:origin-(--radix-tooltip-content-transform-origin) sds:animate-in sds:rounded-md sds:bg-foreground sds:px-3 sds:py-1.5 sds:text-xs sds:text-balance sds:text-background sds:fade-in-0 sds:zoom-in-95 sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="sds:z-50 sds:size-2.5 sds:translate-y-[calc(-50%_-_2px)] sds:rotate-45 sds:rounded-[2px] sds:bg-foreground sds:fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
