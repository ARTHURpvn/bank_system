import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[#3F3F3F]/50 text-[#868686] shadow-xs hover:bg-[#3F3F3F]/90",
        destructive:
          "bg-[#DC2424] text-white shadow-xs focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-[#DC2424]",
        activated:
          " text-[#2BFF00] shadow-xs hover:text-accent-foreground bg-[#126B00]/90",
        green_action:
          "bg-[#205116]/50 text-[#2BFF00] border border-[#2BFF00]/50 shadow-xs hover:bg-[#205116]/80 text-lg",
        red_action:
          "bg-[#DC2424]/30 text-[#DC2424] border border-[#DC2424]/50 shadow-xs hover:bg-[#DC2424]/40 text-lg",
        white_action:
          "bg-white/30 text-white border border-white/50 shadow-xs hover:bg-white/40 text-lg",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
