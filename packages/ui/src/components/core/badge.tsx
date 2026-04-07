import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "sds:inline-flex sds:w-fit sds:shrink-0 sds:items-center sds:justify-center sds:gap-1 sds:overflow-hidden sds:rounded-full sds:border sds:border-transparent sds:px-2 sds:py-0.5 sds:text-xs sds:font-medium sds:whitespace-nowrap sds:transition-[color,box-shadow] sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:dark:aria-invalid:ring-destructive/40 sds:[&>svg]:pointer-events-none sds:[&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "sds:bg-primary sds:text-primary-foreground sds:[a&]:hover:bg-primary/90",
        secondary:
          "sds:bg-secondary sds:text-secondary-foreground sds:[a&]:hover:bg-secondary/90",
        destructive:
          "sds:bg-destructive sds:text-white sds:focus-visible:ring-destructive/20 sds:dark:bg-destructive/60 sds:dark:focus-visible:ring-destructive/40 sds:[a&]:hover:bg-destructive/90",
        outline:
          "sds:border-border sds:text-foreground sds:[a&]:hover:bg-accent sds:[a&]:hover:text-accent-foreground",
        ghost: "sds:[a&]:hover:bg-accent sds:[a&]:hover:text-accent-foreground",
        link: "sds:text-primary sds:underline-offset-4 sds:[a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
