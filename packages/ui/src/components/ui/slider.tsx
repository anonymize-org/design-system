"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "sds::relative sds::flex sds::w-full sds::touch-none sds::items-center sds::select-none sds::data-[disabled]:opacity-50 sds::data-[orientation=vertical]:h-full sds::data-[orientation=vertical]:min-h-44 sds::data-[orientation=vertical]:w-auto sds::data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "sds::relative sds::grow sds::overflow-hidden sds::rounded-full sds::bg-muted sds::data-[orientation=horizontal]:h-1.5 sds::data-[orientation=horizontal]:w-full sds::data-[orientation=vertical]:h-full sds::data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "sds::absolute sds::bg-primary sds::data-[orientation=horizontal]:h-full sds::data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="sds::block sds::size-4 sds::shrink-0 sds::rounded-full sds::border sds::border-primary sds::bg-white sds::shadow-sm sds::ring-ring/50 sds::transition-[color,box-shadow] sds::hover:ring-4 sds::focus-visible:ring-4 sds::focus-visible:outline-hidden sds::disabled:pointer-events-none sds::disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
