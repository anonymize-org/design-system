"use client"

import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "sds:flex sds:h-full sds:w-full sds:aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "sds:relative sds:flex sds:w-px sds:items-center sds:justify-center sds:bg-border sds:after:absolute sds:after:inset-y-0 sds:after:left-1/2 sds:after:w-1 sds:after:-translate-x-1/2 sds:focus-visible:ring-1 sds:focus-visible:ring-ring sds:focus-visible:ring-offset-1 sds:focus-visible:outline-hidden sds:aria-[orientation=horizontal]:h-px sds:aria-[orientation=horizontal]:w-full sds:aria-[orientation=horizontal]:after:left-0 sds:aria-[orientation=horizontal]:after:h-1 sds:aria-[orientation=horizontal]:after:w-full sds:aria-[orientation=horizontal]:after:translate-x-0 sds:aria-[orientation=horizontal]:after:-translate-y-1/2 sds:[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="sds:z-10 sds:flex sds:h-4 sds:w-3 sds:items-center sds:justify-center sds:rounded-xs sds:border sds:bg-border">
          <GripVerticalIcon className="sds:size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
