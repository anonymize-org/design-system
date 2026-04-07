import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("sds:animate-pulse sds:rounded-md sds:bg-accent", className)}
      {...props}
    />
  )
}

export { Skeleton }
