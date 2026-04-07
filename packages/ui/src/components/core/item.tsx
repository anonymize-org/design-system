import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/core/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("sds:group/item-group sds:flex sds:flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("sds:my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "sds:group/item sds:flex sds:flex-wrap sds:items-center sds:rounded-md sds:border sds:border-transparent sds:text-sm sds:transition-colors sds:duration-100 sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:[a]:transition-colors sds:[a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "sds:bg-transparent",
        outline: "sds:border-border",
        muted: "sds:bg-muted/50",
      },
      size: {
        default: "sds:gap-4 sds:p-4",
        sm: "sds:gap-2.5 sds:px-4 sds:py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "sds:flex sds:shrink-0 sds:items-center sds:justify-center sds:gap-2 sds:group-has-[[data-slot=item-description]]/item:translate-y-0.5 sds:group-has-[[data-slot=item-description]]/item:self-start sds:[&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "sds:bg-transparent",
        icon: "sds:size-8 sds:rounded-sm sds:border sds:bg-muted sds:[&_svg:not([class*=size-])]:size-4",
        image:
          "sds:size-10 sds:overflow-hidden sds:rounded-sm sds:[&_img]:size-full sds:[&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "sds:flex sds:flex-1 sds:flex-col sds:gap-1 sds:[&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "sds:flex sds:w-fit sds:items-center sds:gap-2 sds:text-sm sds:leading-snug sds:font-medium",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "sds:line-clamp-2 sds:text-sm sds:leading-normal sds:font-normal sds:text-balance sds:text-muted-foreground",
        "sds:[&>a]:underline sds:[&>a]:underline-offset-4 sds:[&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("sds:flex sds:items-center sds:gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "sds:flex sds:basis-full sds:items-center sds:justify-between sds:gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "sds:flex sds:basis-full sds:items-center sds:justify-between sds:gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
