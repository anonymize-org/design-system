"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "sds:flex sds:items-center sds:gap-2 sds:text-sm sds:leading-none sds:font-medium sds:select-none sds:group-data-[disabled=true]:pointer-events-none sds:group-data-[disabled=true]:opacity-50 sds:peer-disabled:cursor-not-allowed sds:peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
