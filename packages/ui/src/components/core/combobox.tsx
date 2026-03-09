"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/core/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/core/input-group"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("sds:[&_svg:not([class*=size-])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="sds:pointer-events-none sds:size-4 sds:text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="sds:pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("sds:w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="sds:group-has-data-[slot=combobox-clear]/input-group:hidden sds:data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="sds:isolate sds:z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "sds:group/combobox-content sds:relative sds:max-h-96 sds:w-(--anchor-width) sds:max-w-(--available-width) sds:min-w-[calc(var(--anchor-width)+--spacing(7))] sds:origin-(--transform-origin) sds:overflow-hidden sds:rounded-md sds:bg-popover sds:text-popover-foreground sds:shadow-md sds:ring-1 sds:ring-foreground/10 sds:duration-100 sds:data-[chips=true]:min-w-(--anchor-width) sds:data-[side=bottom]:slide-in-from-top-2 sds:data-[side=left]:slide-in-from-right-2 sds:data-[side=right]:slide-in-from-left-2 sds:data-[side=top]:slide-in-from-bottom-2 sds:*:data-[slot=input-group]:m-1 sds:*:data-[slot=input-group]:mb-0 sds:*:data-[slot=input-group]:h-8 sds:*:data-[slot=input-group]:border-input/30 sds:*:data-[slot=input-group]:bg-input/30 sds:*:data-[slot=input-group]:shadow-none sds:data-open:animate-in sds:data-open:fade-in-0 sds:data-open:zoom-in-95 sds:data-closed:animate-out sds:data-closed:fade-out-0 sds:data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "sds:max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] sds:scroll-py-1 sds:overflow-y-auto sds:p-1 sds:data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "sds:relative sds:flex sds:w-full sds:cursor-default sds:items-center sds:gap-2 sds:rounded-sm sds:py-1.5 sds:pr-8 sds:pl-2 sds:text-sm sds:outline-hidden sds:select-none sds:data-highlighted:bg-accent sds:data-highlighted:text-accent-foreground sds:data-[disabled]:pointer-events-none sds:data-[disabled]:opacity-50 sds:[&_svg]:pointer-events-none sds:[&_svg]:shrink-0 sds:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        render={
          <span className="sds:pointer-events-none sds:absolute sds:right-2 sds:flex sds:size-4 sds:items-center sds:justify-center" />
        }
      >
        <CheckIcon className="sds:pointer-events-none sds:size-4 sds:pointer-coarse:size-5" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "sds:px-2 sds:py-1.5 sds:text-xs sds:text-muted-foreground sds:pointer-coarse:px-3 sds:pointer-coarse:py-2 sds:pointer-coarse:text-sm",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "sds:hidden sds:w-full sds:justify-center sds:py-2 sds:text-center sds:text-sm sds:text-muted-foreground sds:group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("sds:-mx-1 sds:my-1 sds:h-px sds:bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "sds:flex sds:min-h-9 sds:flex-wrap sds:items-center sds:gap-1.5 sds:rounded-md sds:border sds:border-input sds:bg-transparent sds:bg-clip-padding sds:px-2.5 sds:py-1.5 sds:text-sm sds:shadow-xs sds:transition-[color,box-shadow] sds:focus-within:border-ring sds:focus-within:ring-[3px] sds:focus-within:ring-ring/50 sds:has-aria-invalid:border-destructive sds:has-aria-invalid:ring-[3px] sds:has-aria-invalid:ring-destructive/20 sds:has-data-[slot=combobox-chip]:px-1.5 sds:dark:bg-input/30 sds:dark:has-aria-invalid:border-destructive/50 sds:dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "sds:flex sds:h-[calc(--spacing(5.5))] sds:w-fit sds:items-center sds:justify-center sds:gap-1 sds:rounded-sm sds:bg-muted sds:px-1.5 sds:text-xs sds:font-medium sds:whitespace-nowrap sds:text-foreground sds:has-disabled:pointer-events-none sds:has-disabled:cursor-not-allowed sds:has-disabled:opacity-50 sds:has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="sds:-ml-1 sds:opacity-50 sds:hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="sds:pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  children,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("sds:min-w-16 sds:flex-1 sds:outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
