"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/core/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "sds:flex sds:h-full sds:w-full sds:flex-col sds:overflow-hidden sds:rounded-md sds:bg-popover sds:text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sds:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("sds:overflow-hidden sds:p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="sds:**:data-[slot=command-input-wrapper]:h-12 sds:[&_[cmdk-group-heading]]:px-2 sds:[&_[cmdk-group-heading]]:font-medium sds:[&_[cmdk-group-heading]]:text-muted-foreground sds:[&_[cmdk-group]]:px-2 sds:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 sds:[&_[cmdk-input-wrapper]_svg]:h-5 sds:[&_[cmdk-input-wrapper]_svg]:w-5 sds:[&_[cmdk-input]]:h-12 sds:[&_[cmdk-item]]:px-2 sds:[&_[cmdk-item]]:py-3 sds:[&_[cmdk-item]_svg]:h-5 sds:[&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="sds:flex sds:h-9 sds:items-center sds:gap-2 sds:border-b sds:px-3"
    >
      <SearchIcon className="sds:size-4 sds:shrink-0 sds:opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "sds:flex sds:h-10 sds:w-full sds:rounded-md sds:bg-transparent sds:py-3 sds:text-sm sds:outline-hidden sds:placeholder:text-muted-foreground sds:disabled:cursor-not-allowed sds:disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "sds:max-h-[300px] sds:scroll-py-1 sds:overflow-x-hidden sds:overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="sds:py-6 sds:text-center sds:text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "sds:overflow-hidden sds:p-1 sds:text-foreground sds:[&_[cmdk-group-heading]]:px-2 sds:[&_[cmdk-group-heading]]:py-1.5 sds:[&_[cmdk-group-heading]]:text-xs sds:[&_[cmdk-group-heading]]:font-medium sds:[&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("sds:-mx-1 sds:h-px sds:bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "sds:relative sds:flex sds:cursor-default sds:items-center sds:gap-2 sds:rounded-sm sds:px-2 sds:py-1.5 sds:text-sm sds:outline-hidden sds:select-none sds:data-[disabled=true]:pointer-events-none sds:data-[disabled=true]:opacity-50 sds:data-[selected=true]:bg-accent sds:data-[selected=true]:text-accent-foreground sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4 sds:[&_svg:not([class*=text-])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "sds:ml-auto sds:text-xs sds:tracking-widest sds:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
