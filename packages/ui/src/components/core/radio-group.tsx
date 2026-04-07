"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("sds:grid sds:gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "sds:aspect-square sds:size-4 sds:shrink-0 sds:rounded-full sds:border sds:border-input sds:text-primary sds:shadow-xs sds:transition-[color,box-shadow] sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:cursor-not-allowed sds:disabled:opacity-50 sds:aria-invalid:border-destructive sds:aria-invalid:ring-destructive/20 sds:dark:bg-input/30 sds:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="sds:relative sds:flex sds:items-center sds:justify-center"
      >
        <CircleIcon className="sds:absolute sds:top-1/2 sds:left-1/2 sds:size-2 sds:-translate-x-1/2 sds:-translate-y-1/2 sds:fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
