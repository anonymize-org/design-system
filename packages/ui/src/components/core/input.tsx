import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "sds:h-9 sds:w-full sds:min-w-0 sds:rounded-md sds:border sds:border-input sds:bg-transparent sds:px-3 sds:py-1 sds:text-base sds:shadow-xs sds:transition-[color,box-shadow] sds:outline-none sds:selection:bg-primary sds:selection:text-primary-foreground sds:file:inline-flex sds:file:h-7 sds:file:border-0 sds:file:bg-transparent sds:file:text-sm sds:file:font-medium sds:file:text-foreground sds:placeholder:text-muted-foreground sds:disabled:pointer-events-none sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:md:text-sm sds:dark:bg-input/30",
        "sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50",
        "sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
