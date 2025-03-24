import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "sds:inline-flex sds:items-center sds:justify-center sds:gap-2 sds:whitespace-nowrap sds:rounded-md sds:text-sm sds:font-medium sds:transition-all disabled:sds:pointer-events-none disabled:sds:opacity-50 [&_svg]:sds:pointer-events-none [&_svg:not([class*=size-])]:sds:size-4 sds:shrink-0 [&_svg]:sds:shrink-0 sds:outline-none focus-visible:sds:border-ring focus-visible:sds:ring-ring/50 focus-visible:sds:ring-[3px] aria-invalid:sds:ring-destructive/20 dark:aria-invalid:sds:ring-destructive/40 aria-invalid:sds:border-destructive",
  {
    variants: {
      variant: {
        default:
          "sds:bg-primary sds:text-primary-foreground sds:shadow-xs hover:sds:bg-primary/90",
        destructive:
          "sds:bg-destructive sds:text-white sds:shadow-xs hover:sds:bg-destructive/90 focus-visible:sds:ring-destructive/20 dark:focus-visible:sds:ring-destructive/40 dark:sds:bg-destructive/60",
        outline:
          "sds:border sds:bg-background sds:shadow-xs hover:sds:bg-accent hover:sds:text-accent-foreground dark:sds:bg-input/30 dark:sds:border-input dark:hover:sds:bg-input/50",
        secondary:
          "sds:bg-secondary sds:text-secondary-foreground sds:shadow-xs hover:sds:bg-secondary/80",
        ghost:
          "hover:sds:bg-accent hover:sds:text-accent-foreground dark:hover:sds:bg-accent/50",
        link: "sds:text-primary sds:underline-offset-4 hover:sds:underline",
      },
      size: {
        default: "sds:h-9 sds:px-4 sds:py-2 has-[>svg]:sds:px-3",
        sm: "sds:h-8 sds:rounded-md sds:gap-1.5 sds:px-3 has-[>svg]:sds:px-2.5",
        lg: "sds:h-10 sds:rounded-md sds:px-6 has-[>svg]:sds:px-4",
        icon: "sds:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
