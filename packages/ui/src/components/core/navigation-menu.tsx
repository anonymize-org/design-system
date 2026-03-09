import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "sds:group/navigation-menu sds:relative sds:flex sds:max-w-max sds:flex-1 sds:items-center sds:justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "sds:group sds:flex sds:flex-1 sds:list-none sds:items-center sds:justify-center sds:gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("sds:relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "sds:group sds:inline-flex sds:h-9 sds:w-max sds:items-center sds:justify-center sds:rounded-md sds:bg-background sds:px-4 sds:py-2 sds:text-sm sds:font-medium sds:transition-[color,box-shadow] sds:outline-none sds:hover:bg-accent sds:hover:text-accent-foreground sds:focus:bg-accent sds:focus:text-accent-foreground sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:focus-visible:outline-1 sds:disabled:pointer-events-none sds:disabled:opacity-50 sds:data-[state=open]:bg-accent/50 sds:data-[state=open]:text-accent-foreground sds:data-[state=open]:hover:bg-accent sds:data-[state=open]:focus:bg-accent"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "sds:group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="sds:relative sds:top-[1px] sds:ml-1 sds:size-3 sds:transition sds:duration-300 sds:group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "sds:top-0 sds:left-0 sds:w-full sds:p-2 sds:pr-2.5 sds:data-[motion=from-end]:slide-in-from-right-52 sds:data-[motion=from-start]:slide-in-from-left-52 sds:data-[motion=to-end]:slide-out-to-right-52 sds:data-[motion=to-start]:slide-out-to-left-52 sds:data-[motion^=from-]:animate-in sds:data-[motion^=from-]:fade-in sds:data-[motion^=to-]:animate-out sds:data-[motion^=to-]:fade-out sds:md:absolute sds:md:w-auto",
        "sds:group-data-[viewport=false]/navigation-menu:top-full sds:group-data-[viewport=false]/navigation-menu:mt-1.5 sds:group-data-[viewport=false]/navigation-menu:overflow-hidden sds:group-data-[viewport=false]/navigation-menu:rounded-md sds:group-data-[viewport=false]/navigation-menu:border sds:group-data-[viewport=false]/navigation-menu:bg-popover sds:group-data-[viewport=false]/navigation-menu:text-popover-foreground sds:group-data-[viewport=false]/navigation-menu:shadow sds:group-data-[viewport=false]/navigation-menu:duration-200 sds:**:data-[slot=navigation-menu-link]:focus:ring-0 sds:**:data-[slot=navigation-menu-link]:focus:outline-none sds:group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out sds:group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 sds:group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 sds:group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in sds:group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 sds:group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "sds:absolute sds:top-full sds:left-0 sds:isolate sds:z-50 sds:flex sds:justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "sds:origin-top-center sds:relative sds:mt-1.5 sds:h-[var(--radix-navigation-menu-viewport-height)] sds:w-full sds:overflow-hidden sds:rounded-md sds:border sds:bg-popover sds:text-popover-foreground sds:shadow sds:data-[state=closed]:animate-out sds:data-[state=closed]:zoom-out-95 sds:data-[state=open]:animate-in sds:data-[state=open]:zoom-in-90 sds:md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "sds:flex sds:flex-col sds:gap-1 sds:rounded-sm sds:p-2 sds:text-sm sds:transition-all sds:outline-none sds:hover:bg-accent sds:hover:text-accent-foreground sds:focus:bg-accent sds:focus:text-accent-foreground sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:focus-visible:outline-1 sds:data-[active=true]:bg-accent/50 sds:data-[active=true]:text-accent-foreground sds:data-[active=true]:hover:bg-accent sds:data-[active=true]:focus:bg-accent sds:[&_svg:not([class*=size-])]:size-4 sds:[&_svg:not([class*=text-])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "sds:top-full sds:z-[1] sds:flex sds:h-1.5 sds:items-end sds:justify-center sds:overflow-hidden sds:data-[state=hidden]:animate-out sds:data-[state=hidden]:fade-out sds:data-[state=visible]:animate-in sds:data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="sds:relative sds:top-[60%] sds:h-2 sds:w-2 sds:rotate-45 sds:rounded-tl-sm sds:bg-border sds:shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
