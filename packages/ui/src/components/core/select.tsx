"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "sds:flex sds:w-fit sds:items-center sds:justify-between sds:gap-2 sds:rounded-md sds:border sds:border-input sds:bg-transparent sds:px-3 sds:py-2 sds:text-sm sds:whitespace-nowrap sds:shadow-xs sds:transition-[color,box-shadow] sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:data-[placeholder]:text-muted-foreground sds:data-[size=default]:h-9 sds:data-[size=sm]:h-8 sds:*:data-[slot=select-value]:line-clamp-1 sds:*:data-[slot=select-value]:flex sds:*:data-[slot=select-value]:items-center sds:*:data-[slot=select-value]:gap-2 sds:dark:bg-input/30 sds:dark:hover:bg-input/50 sds:dark:aria-invalid:ring-destructive/40 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4 sds:[&_svg:not([class*=text-])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="sds:size-4 sds:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "sds:relative sds:z-50 sds:max-h-(--radix-select-content-available-height) sds:min-w-[8rem] sds:origin-(--radix-select-content-transform-origin) sds:overflow-x-hidden sds:overflow-y-auto sds:rounded-md sds:border sds:bg-popover sds:text-popover-foreground sds:shadow-md sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=closed]:zoom-out-95 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0 sds:data-[state=open]:zoom-in-95",
          position === "popper" &&
            "sds:data-[side=bottom]:translate-y-1 sds:data-[side=left]:-translate-x-1 sds:data-[side=right]:translate-x-1 sds:data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "sds:p-1",
            position === "popper" &&
              "sds:h-[var(--radix-select-trigger-height)] sds:w-full sds:min-w-[var(--radix-select-trigger-width)] sds:scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("sds:px-2 sds:py-1.5 sds:text-xs sds:text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "sds:relative sds:flex sds:w-full sds:cursor-default sds:items-center sds:gap-2 sds:rounded-sm sds:py-1.5 sds:pr-8 sds:pl-2 sds:text-sm sds:outline-hidden sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[disabled]:pointer-events-none sds:data-[disabled]:opacity-50 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4 sds:[&_svg:not([class*=text-])]:text-muted-foreground sds:*:[span]:last:flex sds:*:[span]:last:items-center sds:*:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="sds:absolute sds:right-2 sds:flex sds:size-3.5 sds:items-center sds:justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="sds:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("sds:pointer-events-none sds:-mx-1 sds:my-1 sds:h-px sds:bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "sds:flex sds:cursor-default sds:items-center sds:justify-center sds:py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="sds:size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "sds:flex sds:cursor-default sds:items-center sds:justify-center sds:py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="sds:size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
