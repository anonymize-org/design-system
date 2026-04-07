"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "sds:group/avatar sds:relative sds:flex sds:size-8 sds:shrink-0 sds:overflow-hidden sds:rounded-full sds:select-none sds:data-[size=lg]:size-10 sds:data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("sds:aspect-square sds:size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "sds:flex sds:size-full sds:items-center sds:justify-center sds:rounded-full sds:bg-muted sds:text-sm sds:text-muted-foreground sds:group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "sds:absolute sds:right-0 sds:bottom-0 sds:z-10 sds:inline-flex sds:items-center sds:justify-center sds:rounded-full sds:bg-primary sds:text-primary-foreground sds:ring-2 sds:ring-background sds:select-none",
        "sds:group-data-[size=sm]/avatar:size-2 sds:group-data-[size=sm]/avatar:[&>svg]:hidden",
        "sds:group-data-[size=default]/avatar:size-2.5 sds:group-data-[size=default]/avatar:[&>svg]:size-2",
        "sds:group-data-[size=lg]/avatar:size-3 sds:group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "sds:group/avatar-group sds:flex sds:-space-x-2 sds:*:data-[slot=avatar]:ring-2 sds:*:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "sds:relative sds:flex sds:size-8 sds:shrink-0 sds:items-center sds:justify-center sds:rounded-full sds:bg-muted sds:text-sm sds:text-muted-foreground sds:ring-2 sds:ring-background sds:group-has-data-[size=lg]/avatar-group:size-10 sds:group-has-data-[size=sm]/avatar-group:size-6 sds:[&>svg]:size-4 sds:group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 sds:group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
