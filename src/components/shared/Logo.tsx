import Link from "next/link";
import { Ticket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      box: "w-8 h-8 rounded-lg",
      icon: "w-4 h-4",
      zapBox: "-top-1 -right-1 p-0.5 border-2",
      zapIcon: "w-2 h-2",
      title: "text-lg",
      subtitle: "text-[8px]",
      gap: "gap-2",
    },
    md: {
      box: "w-10 h-10 rounded-xl",
      icon: "w-6 h-6",
      zapBox: "-top-1.5 -right-1.5 p-0.5 border-[3px]",
      zapIcon: "w-3 h-3",
      title: "text-xl",
      subtitle: "text-[10px]",
      gap: "gap-2.5",
    },
    lg: {
      box: "w-16 h-16 rounded-2xl",
      icon: "w-9 h-9",
      zapBox: "-top-2 -right-2 p-1 border-4",
      zapIcon: "w-4 h-4",
      title: "text-3xl",
      subtitle: "text-sm",
      gap: "gap-3",
    },
  };

  const current = sizeClasses[size];

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center group focus:outline-none",
        current.gap,
        className
      )}
      aria-label="Velotix Home"
    >
      {/* Icon Container */}
      <div
        className={cn(
          "relative flex items-center justify-center bg-primary text-primary-foreground transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/25",
          current.box
        )}
      >
        {/* Main Icon */}
        <Ticket className={current.icon} strokeWidth={2.5} />

        {/* Lightning Badge */}
        <div
          className={cn(
            "absolute bg-yellow-400 text-black rounded-full border-background shadow-sm flex items-center justify-center",
            current.zapBox
          )}
        >
          <Zap className={cn("fill-current", current.zapIcon)} />
        </div>
      </div>

      {/* Text Container */}
      <div className="flex flex-col -space-y-1">
        <span
          className={cn(
            "font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300",
            current.title
          )}
        >
          Velotix
        </span>
        <span
          className={cn(
            "font-bold text-muted-foreground tracking-widest uppercase",
            current.subtitle
          )}
        >
          Fast Booking
        </span>
      </div>
    </Link>
  );
}
