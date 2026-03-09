"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "sds:fixed sds:inset-0 sds:z-50 sds:bg-black/50 sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=open]:animate-in sds:data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "sds:group/drawer-content sds:fixed sds:z-50 sds:flex sds:h-auto sds:flex-col sds:bg-background",
          "sds:data-[vaul-drawer-direction=top]:inset-x-0 sds:data-[vaul-drawer-direction=top]:top-0 sds:data-[vaul-drawer-direction=top]:mb-24 sds:data-[vaul-drawer-direction=top]:max-h-[80vh] sds:data-[vaul-drawer-direction=top]:rounded-b-lg sds:data-[vaul-drawer-direction=top]:border-b",
          "sds:data-[vaul-drawer-direction=bottom]:inset-x-0 sds:data-[vaul-drawer-direction=bottom]:bottom-0 sds:data-[vaul-drawer-direction=bottom]:mt-24 sds:data-[vaul-drawer-direction=bottom]:max-h-[80vh] sds:data-[vaul-drawer-direction=bottom]:rounded-t-lg sds:data-[vaul-drawer-direction=bottom]:border-t",
          "sds:data-[vaul-drawer-direction=right]:inset-y-0 sds:data-[vaul-drawer-direction=right]:right-0 sds:data-[vaul-drawer-direction=right]:w-3/4 sds:data-[vaul-drawer-direction=right]:border-l sds:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "sds:data-[vaul-drawer-direction=left]:inset-y-0 sds:data-[vaul-drawer-direction=left]:left-0 sds:data-[vaul-drawer-direction=left]:w-3/4 sds:data-[vaul-drawer-direction=left]:border-r sds:data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="sds:mx-auto sds:mt-4 sds:hidden sds:h-2 sds:w-[100px] sds:shrink-0 sds:rounded-full sds:bg-muted sds:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "sds:flex sds:flex-col sds:gap-0.5 sds:p-4 sds:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center sds:group-data-[vaul-drawer-direction=top]/drawer-content:text-center sds:md:gap-1.5 sds:md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("sds:mt-auto sds:flex sds:flex-col sds:gap-2 sds:p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("sds:font-semibold sds:text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("sds:text-sm sds:text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
