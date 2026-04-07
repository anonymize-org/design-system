import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "sds:relative sds:grid sds:w-full sds:grid-cols-[0_1fr] sds:items-start sds:gap-y-0.5 sds:rounded-lg sds:border sds:px-4 sds:py-3 sds:text-sm sds:has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] sds:has-[>svg]:gap-x-3 sds:[&>svg]:size-4 sds:[&>svg]:translate-y-0.5 sds:[&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "sds:bg-card sds:text-card-foreground",
        destructive:
          "sds:bg-card sds:text-destructive sds:*:data-[slot=alert-description]:text-destructive/90 sds:[&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "sds:col-start-2 sds:line-clamp-1 sds:min-h-4 sds:font-medium sds:tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "sds:col-start-2 sds:grid sds:justify-items-start sds:gap-1 sds:text-sm sds:text-muted-foreground sds:[&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
