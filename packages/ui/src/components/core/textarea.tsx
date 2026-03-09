import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "sds:flex sds:field-sizing-content sds:min-h-16 sds:w-full sds:rounded-md sds:border sds:border-input sds:bg-transparent sds:px-3 sds:py-2 sds:text-base sds:shadow-xs sds:transition-[color,box-shadow] sds:outline-none sds:placeholder:text-muted-foreground sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:md:text-sm sds:dark:bg-input/30 sds:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
