"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "sds:peer sds:size-4 sds:shrink-0 sds:rounded-[4px] sds:border sds:border-input sds:shadow-xs sds:transition-shadow sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:data-[state=checked]:border-primary sds:data-[state=checked]:bg-primary sds:data-[state=checked]:text-primary-foreground sds:dark:bg-input/30 sds:dark:aria-invalid:ring-destructive/40 sds:dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="sds:grid sds:place-content-center sds:text-current sds:transition-none"
      >
        <CheckIcon className="sds:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
