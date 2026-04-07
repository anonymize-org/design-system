"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/core/button"
import { Input } from "@/components/core/input"
import { Textarea } from "@/components/core/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "sds:group/input-group sds:relative sds:flex sds:w-full sds:items-center sds:rounded-md sds:border sds:border-input sds:shadow-xs sds:transition-[color,box-shadow] sds:outline-none sds:dark:bg-input/30",
        "sds:h-9 sds:min-w-0 sds:has-[>textarea]:h-auto",

        // Variants based on alignment.
        "sds:has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "sds:has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "sds:has-[>[data-align=block-start]]:h-auto sds:has-[>[data-align=block-start]]:flex-col sds:has-[>[data-align=block-start]]:[&>input]:pb-3",
        "sds:has-[>[data-align=block-end]]:h-auto sds:has-[>[data-align=block-end]]:flex-col sds:has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "sds:has-[[data-slot=input-group-control]:focus-visible]:border-ring sds:has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] sds:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",

        // Error state.
        "sds:has-[[data-slot][aria-invalid=true]]:border-destructive sds:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 sds:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "sds:flex sds:h-auto sds:cursor-text sds:items-center sds:justify-center sds:gap-2 sds:py-1.5 sds:text-sm sds:font-medium sds:text-muted-foreground sds:select-none sds:group-data-[disabled=true]/input-group:opacity-50 sds:[&>kbd]:rounded-[calc(var(--radius)-5px)] sds:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "sds:order-first sds:pl-3 sds:has-[>button]:ml-[-0.45rem] sds:has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "sds:order-last sds:pr-3 sds:has-[>button]:mr-[-0.45rem] sds:has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "sds:order-first sds:w-full sds:justify-start sds:px-3 sds:pt-3 sds:group-has-[>input]/input-group:pt-2.5 sds:[.border-b]:pb-3",
        "block-end":
          "sds:order-last sds:w-full sds:justify-start sds:px-3 sds:pb-3 sds:group-has-[>input]/input-group:pb-2.5 sds:[.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "sds:flex sds:items-center sds:gap-2 sds:text-sm sds:shadow-none",
  {
    variants: {
      size: {
        xs: "sds:h-6 sds:gap-1 sds:rounded-[calc(var(--radius)-5px)] sds:px-2 sds:has-[>svg]:px-2 sds:[&>svg:not([class*=size-])]:size-3.5",
        sm: "sds:h-8 sds:gap-1.5 sds:rounded-md sds:px-2.5 sds:has-[>svg]:px-2.5",
        "icon-xs":
          "sds:size-6 sds:rounded-[calc(var(--radius)-5px)] sds:p-0 sds:has-[>svg]:p-0",
        "icon-sm": "sds:size-8 sds:p-0 sds:has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "sds:flex sds:items-center sds:gap-2 sds:text-sm sds:text-muted-foreground sds:[&_svg]:pointer-events-none sds:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "sds:flex-1 sds:rounded-none sds:border-0 sds:bg-transparent sds:shadow-none sds:focus-visible:ring-0 sds:dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "sds:flex-1 sds:resize-none sds:rounded-none sds:border-0 sds:bg-transparent sds:py-3 sds:shadow-none sds:focus-visible:ring-0 sds:dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
