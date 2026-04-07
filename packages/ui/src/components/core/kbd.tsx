import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "sds:pointer-events-none sds:inline-flex sds:h-5 sds:w-fit sds:min-w-5 sds:items-center sds:justify-center sds:gap-1 sds:rounded-sm sds:bg-muted sds:px-1 sds:font-sans sds:text-xs sds:font-medium sds:text-muted-foreground sds:select-none",
        "sds:[&_svg:not([class*=size-])]:size-3",
        "sds:[[data-slot=tooltip-content]_&]:bg-background/20 sds:[[data-slot=tooltip-content]_&]:text-background sds:dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("sds:inline-flex sds:items-center sds:gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
