"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "sds:flex sds:h-9 sds:items-center sds:gap-1 sds:rounded-md sds:border sds:bg-background sds:p-1 sds:shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "sds:flex sds:items-center sds:rounded-sm sds:px-2 sds:py-1 sds:text-sm sds:font-medium sds:outline-hidden sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[state=open]:bg-accent sds:data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "sds:z-50 sds:min-w-[12rem] sds:origin-(--radix-menubar-content-transform-origin) sds:overflow-hidden sds:rounded-md sds:border sds:bg-popover sds:p-1 sds:text-popover-foreground sds:shadow-md sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:data-[state=closed]:fade-out-0 sds:data-[state=closed]:zoom-out-95 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0 sds:data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "sds:relative sds:flex sds:cursor-default sds:items-center sds:gap-2 sds:rounded-sm sds:px-2 sds:py-1.5 sds:text-sm sds:outline-hidden sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[disabled]:pointer-events-none sds:data-[disabled]:opacity-50 sds:data-[inset]:pl-8 sds:data-[variant=destructive]:text-destructive sds:data-[variant=destructive]:focus:bg-destructive/10 sds:data-[variant=destructive]:focus:text-destructive sds:dark:data-[variant=destructive]:focus:bg-destructive/20 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4 sds:[&_svg:not([class*=text-])]:text-muted-foreground sds:data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "sds:relative sds:flex sds:cursor-default sds:items-center sds:gap-2 sds:rounded-xs sds:py-1.5 sds:pr-2 sds:pl-8 sds:text-sm sds:outline-hidden sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[disabled]:pointer-events-none sds:data-[disabled]:opacity-50 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="sds:pointer-events-none sds:absolute sds:left-2 sds:flex sds:size-3.5 sds:items-center sds:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="sds:size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "sds:relative sds:flex sds:cursor-default sds:items-center sds:gap-2 sds:rounded-xs sds:py-1.5 sds:pr-2 sds:pl-8 sds:text-sm sds:outline-hidden sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[disabled]:pointer-events-none sds:data-[disabled]:opacity-50 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="sds:pointer-events-none sds:absolute sds:left-2 sds:flex sds:size-3.5 sds:items-center sds:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="sds:size-2 sds:fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "sds:px-2 sds:py-1.5 sds:text-sm sds:font-medium sds:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("sds:-mx-1 sds:my-1 sds:h-px sds:bg-border", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "sds:ml-auto sds:text-xs sds:tracking-widest sds:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "sds:flex sds:cursor-default sds:items-center sds:rounded-sm sds:px-2 sds:py-1.5 sds:text-sm sds:outline-none sds:select-none sds:focus:bg-accent sds:focus:text-accent-foreground sds:data-[inset]:pl-8 sds:data-[state=open]:bg-accent sds:data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="sds:ml-auto sds:h-4 sds:w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "sds:z-50 sds:min-w-[8rem] sds:origin-(--radix-menubar-content-transform-origin) sds:overflow-hidden sds:rounded-md sds:border sds:bg-popover sds:p-1 sds:text-popover-foreground sds:shadow-lg sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=closed]:zoom-out-95 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0 sds:data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
