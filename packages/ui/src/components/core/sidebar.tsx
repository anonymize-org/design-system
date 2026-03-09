"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/core/button"
import { Input } from "@/components/core/input"
import { Separator } from "@/components/core/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/core/sheet"
import { Skeleton } from "@/components/core/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "sds:group/sidebar-wrapper sds:flex sds:min-h-svh sds:w-full sds:has-data-[variant=inset]:bg-sidebar",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "sds:flex sds:h-full sds:w-(--sidebar-width) sds:flex-col sds:bg-sidebar sds:text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="sds:w-(--sidebar-width) sds:bg-sidebar sds:p-0 sds:text-sidebar-foreground sds:[&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sds:sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="sds:flex sds:h-full sds:w-full sds:flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="sds:group sds:peer sds:hidden sds:text-sidebar-foreground sds:md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "sds:relative sds:w-(--sidebar-width) sds:bg-transparent sds:transition-[width] sds:duration-200 sds:ease-linear",
          "sds:group-data-[collapsible=offcanvas]:w-0",
          "sds:group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "sds:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "sds:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "sds:fixed sds:inset-y-0 sds:z-10 sds:hidden sds:h-svh sds:w-(--sidebar-width) sds:transition-[left,right,width] sds:duration-200 sds:ease-linear sds:md:flex",
          side === "left"
            ? "sds:left-0 sds:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "sds:right-0 sds:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "sds:p-2 sds:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "sds:group-data-[collapsible=icon]:w-(--sidebar-width-icon) sds:group-data-[side=left]:border-r sds:group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="sds:flex sds:h-full sds:w-full sds:flex-col sds:bg-sidebar sds:group-data-[variant=floating]:rounded-lg sds:group-data-[variant=floating]:border sds:group-data-[variant=floating]:border-sidebar-border sds:group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("sds:size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sds:sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "sds:absolute sds:inset-y-0 sds:z-20 sds:hidden sds:w-4 sds:-translate-x-1/2 sds:transition-all sds:ease-linear sds:group-data-[side=left]:-right-4 sds:group-data-[side=right]:left-0 sds:after:absolute sds:after:inset-y-0 sds:after:left-1/2 sds:after:w-[2px] sds:hover:after:bg-sidebar-border sds:sm:flex",
        "sds:in-data-[side=left]:cursor-w-resize sds:in-data-[side=right]:cursor-e-resize",
        "sds:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize sds:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "sds:group-data-[collapsible=offcanvas]:translate-x-0 sds:group-data-[collapsible=offcanvas]:after:left-full sds:hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "sds:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "sds:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "sds:relative sds:flex sds:w-full sds:flex-1 sds:flex-col sds:bg-background",
        "sds:md:peer-data-[variant=inset]:m-2 sds:md:peer-data-[variant=inset]:ml-0 sds:md:peer-data-[variant=inset]:rounded-xl sds:md:peer-data-[variant=inset]:shadow-sm sds:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("sds:h-8 sds:w-full sds:bg-background sds:shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("sds:flex sds:flex-col sds:gap-2 sds:p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("sds:flex sds:flex-col sds:gap-2 sds:p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("sds:mx-2 sds:w-auto sds:bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "sds:flex sds:min-h-0 sds:flex-1 sds:flex-col sds:gap-2 sds:overflow-auto sds:group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("sds:relative sds:flex sds:w-full sds:min-w-0 sds:flex-col sds:p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "sds:flex sds:h-8 sds:shrink-0 sds:items-center sds:rounded-md sds:px-2 sds:text-xs sds:font-medium sds:text-sidebar-foreground/70 sds:ring-sidebar-ring sds:outline-hidden sds:transition-[margin,opacity] sds:duration-200 sds:ease-linear sds:focus-visible:ring-2 sds:[&>svg]:size-4 sds:[&>svg]:shrink-0",
        "sds:group-data-[collapsible=icon]:-mt-8 sds:group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "sds:absolute sds:top-3.5 sds:right-3 sds:flex sds:aspect-square sds:w-5 sds:items-center sds:justify-center sds:rounded-md sds:p-0 sds:text-sidebar-foreground sds:ring-sidebar-ring sds:outline-hidden sds:transition-transform sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground sds:focus-visible:ring-2 sds:[&>svg]:size-4 sds:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "sds:after:absolute sds:after:-inset-2 sds:md:after:hidden",
        "sds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("sds:w-full sds:text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("sds:flex sds:w-full sds:min-w-0 sds:flex-col sds:gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("sds:group/menu-item sds:relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "sds:peer/menu-button sds:flex sds:w-full sds:items-center sds:gap-2 sds:overflow-hidden sds:rounded-md sds:p-2 sds:text-left sds:text-sm sds:ring-sidebar-ring sds:outline-hidden sds:transition-[width,height,padding] sds:group-has-data-[sidebar=menu-action]/menu-item:pr-8 sds:group-data-[collapsible=icon]:size-8! sds:group-data-[collapsible=icon]:p-2! sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground sds:focus-visible:ring-2 sds:active:bg-sidebar-accent sds:active:text-sidebar-accent-foreground sds:disabled:pointer-events-none sds:disabled:opacity-50 sds:aria-disabled:pointer-events-none sds:aria-disabled:opacity-50 sds:data-[active=true]:bg-sidebar-accent sds:data-[active=true]:font-medium sds:data-[active=true]:text-sidebar-accent-foreground sds:data-[state=open]:hover:bg-sidebar-accent sds:data-[state=open]:hover:text-sidebar-accent-foreground sds:[&>span:last-child]:truncate sds:[&>svg]:size-4 sds:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground",
        outline:
          "sds:bg-background sds:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground sds:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "sds:h-8 sds:text-sm",
        sm: "sds:h-7 sds:text-xs",
        lg: "sds:h-12 sds:text-sm sds:group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "sds:absolute sds:top-1.5 sds:right-1 sds:flex sds:aspect-square sds:w-5 sds:items-center sds:justify-center sds:rounded-md sds:p-0 sds:text-sidebar-foreground sds:ring-sidebar-ring sds:outline-hidden sds:transition-transform sds:peer-hover/menu-button:text-sidebar-accent-foreground sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground sds:focus-visible:ring-2 sds:[&>svg]:size-4 sds:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "sds:after:absolute sds:after:-inset-2 sds:md:after:hidden",
        "sds:peer-data-[size=sm]/menu-button:top-1",
        "sds:peer-data-[size=default]/menu-button:top-1.5",
        "sds:peer-data-[size=lg]/menu-button:top-2.5",
        "sds:group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "sds:group-focus-within/menu-item:opacity-100 sds:group-hover/menu-item:opacity-100 sds:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground sds:data-[state=open]:opacity-100 sds:md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "sds:pointer-events-none sds:absolute sds:right-1 sds:flex sds:h-5 sds:min-w-5 sds:items-center sds:justify-center sds:rounded-md sds:px-1 sds:text-xs sds:font-medium sds:text-sidebar-foreground sds:tabular-nums sds:select-none",
        "sds:peer-hover/menu-button:text-sidebar-accent-foreground sds:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "sds:peer-data-[size=sm]/menu-button:top-1",
        "sds:peer-data-[size=default]/menu-button:top-1.5",
        "sds:peer-data-[size=lg]/menu-button:top-2.5",
        "sds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("sds:flex sds:h-8 sds:items-center sds:gap-2 sds:rounded-md sds:px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="sds:size-4 sds:rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="sds:h-4 sds:max-w-(--skeleton-width) sds:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "sds:mx-3.5 sds:flex sds:min-w-0 sds:translate-x-px sds:flex-col sds:gap-1 sds:border-l sds:border-sidebar-border sds:px-2.5 sds:py-0.5",
        "sds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("sds:group/menu-sub-item sds:relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "sds:flex sds:h-7 sds:min-w-0 sds:-translate-x-px sds:items-center sds:gap-2 sds:overflow-hidden sds:rounded-md sds:px-2 sds:text-sidebar-foreground sds:ring-sidebar-ring sds:outline-hidden sds:hover:bg-sidebar-accent sds:hover:text-sidebar-accent-foreground sds:focus-visible:ring-2 sds:active:bg-sidebar-accent sds:active:text-sidebar-accent-foreground sds:disabled:pointer-events-none sds:disabled:opacity-50 sds:aria-disabled:pointer-events-none sds:aria-disabled:opacity-50 sds:[&>span:last-child]:truncate sds:[&>svg]:size-4 sds:[&>svg]:shrink-0 sds:[&>svg]:text-sidebar-accent-foreground",
        "sds:data-[active=true]:bg-sidebar-accent sds:data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "sds:text-xs",
        size === "md" && "sds:text-sm",
        "sds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
