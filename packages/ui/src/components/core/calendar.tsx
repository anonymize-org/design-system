"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/core/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "sds:group/calendar sds:bg-background sds:p-3 sds:[--cell-size:--spacing(8)] sds:[[data-slot=card-content]_&]:bg-transparent sds:[[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("sds:w-fit", defaultClassNames.root),
        months: cn(
          "sds:relative sds:flex sds:flex-col sds:gap-4 sds:md:flex-row",
          defaultClassNames.months
        ),
        month: cn("sds:flex sds:w-full sds:flex-col sds:gap-4", defaultClassNames.month),
        nav: cn(
          "sds:absolute sds:inset-x-0 sds:top-0 sds:flex sds:w-full sds:items-center sds:justify-between sds:gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "sds:size-(--cell-size) sds:p-0 sds:select-none sds:aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "sds:size-(--cell-size) sds:p-0 sds:select-none sds:aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "sds:flex sds:h-(--cell-size) sds:w-full sds:items-center sds:justify-center sds:px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "sds:flex sds:h-(--cell-size) sds:w-full sds:items-center sds:justify-center sds:gap-1.5 sds:text-sm sds:font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "sds:relative sds:rounded-md sds:border sds:border-input sds:shadow-xs sds:has-focus:border-ring sds:has-focus:ring-[3px] sds:has-focus:ring-ring/50",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "sds:absolute sds:inset-0 sds:bg-popover sds:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "sds:font-medium sds:select-none",
          captionLayout === "label"
            ? "sds:text-sm"
            : "sds:flex sds:h-8 sds:items-center sds:gap-1 sds:rounded-md sds:pr-1 sds:pl-2 sds:text-sm sds:[&>svg]:size-3.5 sds:[&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "sds:w-full sds:border-collapse",
        weekdays: cn("sds:flex", defaultClassNames.weekdays),
        weekday: cn(
          "sds:flex-1 sds:rounded-md sds:text-[0.8rem] sds:font-normal sds:text-muted-foreground sds:select-none",
          defaultClassNames.weekday
        ),
        week: cn("sds:mt-2 sds:flex sds:w-full", defaultClassNames.week),
        week_number_header: cn(
          "sds:w-(--cell-size) sds:select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "sds:text-[0.8rem] sds:text-muted-foreground sds:select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "sds:group/day sds:relative sds:aspect-square sds:h-full sds:w-full sds:p-0 sds:text-center sds:select-none sds:[&:last-child[data-selected=true]_button]:rounded-r-md",
          props.showWeekNumber
            ? "sds:[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "sds:[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "sds:rounded-l-md sds:bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("sds:rounded-none", defaultClassNames.range_middle),
        range_end: cn("sds:rounded-r-md sds:bg-accent", defaultClassNames.range_end),
        today: cn(
          "sds:rounded-md sds:bg-accent sds:text-accent-foreground sds:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "sds:text-muted-foreground sds:aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "sds:text-muted-foreground sds:opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("sds:invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("sds:size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("sds:size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("sds:size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="sds:flex sds:size-(--cell-size) sds:items-center sds:justify-center sds:text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "sds:flex sds:aspect-square sds:size-auto sds:w-full sds:min-w-(--cell-size) sds:flex-col sds:gap-1 sds:leading-none sds:font-normal sds:group-data-[focused=true]/day:relative sds:group-data-[focused=true]/day:z-10 sds:group-data-[focused=true]/day:border-ring sds:group-data-[focused=true]/day:ring-[3px] sds:group-data-[focused=true]/day:ring-ring/50 sds:data-[range-end=true]:rounded-md sds:data-[range-end=true]:rounded-r-md sds:data-[range-end=true]:bg-primary sds:data-[range-end=true]:text-primary-foreground sds:data-[range-middle=true]:rounded-none sds:data-[range-middle=true]:bg-accent sds:data-[range-middle=true]:text-accent-foreground sds:data-[range-start=true]:rounded-md sds:data-[range-start=true]:rounded-l-md sds:data-[range-start=true]:bg-primary sds:data-[range-start=true]:text-primary-foreground sds:data-[selected-single=true]:bg-primary sds:data-[selected-single=true]:text-primary-foreground sds:dark:hover:text-accent-foreground sds:[&>span]:text-xs sds:[&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
