"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "sds:peer sds:group/switch sds:inline-flex sds:shrink-0 sds:items-center sds:rounded-full sds:border sds:border-transparent sds:shadow-xs sds:transition-all sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:data-[size=default]:h-[1.15rem] sds:data-[size=default]:w-8 sds:data-[size=sm]:h-3.5 sds:data-[size=sm]:w-6 sds:data-[state=checked]:bg-primary sds:data-[state=unchecked]:bg-input sds:dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "sds:pointer-events-none sds:block sds:rounded-full sds:bg-background sds:ring-0 sds:transition-transform sds:group-data-[size=default]/switch:size-4 sds:group-data-[size=sm]/switch:size-3 sds:data-[state=checked]:translate-x-[calc(100%-2px)] sds:data-[state=unchecked]:translate-x-0 sds:dark:data-[state=checked]:bg-primary-foreground sds:dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
