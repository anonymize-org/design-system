"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("sds:disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("sds:flex sds:items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "sds:relative sds:flex sds:h-9 sds:w-9 sds:items-center sds:justify-center sds:border-y sds:border-r sds:border-input sds:text-sm sds:shadow-xs sds:transition-all sds:outline-none sds:first:rounded-l-md sds:first:border-l sds:last:rounded-r-md sds:aria-invalid:border-destructive sds:data-[active=true]:z-10 sds:data-[active=true]:border-ring sds:data-[active=true]:ring-[3px] sds:data-[active=true]:ring-ring/50 sds:data-[active=true]:aria-invalid:border-destructive sds:data-[active=true]:aria-invalid:ring-destructive/20 sds:dark:bg-input/30 sds:dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="sds:pointer-events-none sds:absolute sds:inset-0 sds:flex sds:items-center sds:justify-center">
          <div className="sds:h-4 sds:w-px sds:animate-caret-blink sds:bg-foreground sds:duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
