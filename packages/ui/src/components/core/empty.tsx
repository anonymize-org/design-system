import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "sds:flex sds:min-w-0 sds:flex-1 sds:flex-col sds:items-center sds:justify-center sds:gap-6 sds:rounded-lg sds:border-dashed sds:p-6 sds:text-center sds:text-balance sds:md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "sds:flex sds:max-w-sm sds:flex-col sds:items-center sds:gap-2 sds:text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "sds:mb-2 sds:flex sds:shrink-0 sds:items-center sds:justify-center sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "sds:bg-transparent",
        icon: "sds:flex sds:size-10 sds:shrink-0 sds:items-center sds:justify-center sds:rounded-lg sds:bg-muted sds:text-foreground sds:[&_svg:not([class*=size-])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("sds:text-lg sds:font-medium sds:tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "sds:text-sm/relaxed sds:text-muted-foreground sds:[&>a]:underline sds:[&>a]:underline-offset-4 sds:[&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "sds:flex sds:w-full sds:max-w-sm sds:min-w-0 sds:flex-col sds:items-center sds:gap-4 sds:text-sm sds:text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
