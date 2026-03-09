import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/core/separator"

const buttonGroupVariants = cva(
  "sds:flex sds:w-fit sds:items-stretch sds:has-[>[data-slot=button-group]]:gap-2 sds:[&>*]:focus-visible:relative sds:[&>*]:focus-visible:z-10 sds:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md sds:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit sds:[&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "sds:[&>*:not(:first-child)]:rounded-l-none sds:[&>*:not(:first-child)]:border-l-0 sds:[&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "sds:flex-col sds:[&>*:not(:first-child)]:rounded-t-none sds:[&>*:not(:first-child)]:border-t-0 sds:[&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      className={cn(
        "sds:flex sds:items-center sds:gap-2 sds:rounded-md sds:border sds:bg-muted sds:px-4 sds:text-sm sds:font-medium sds:shadow-xs sds:[&_svg]:pointer-events-none sds:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "sds:relative sds:m-0! sds:self-stretch sds:bg-input sds:data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
