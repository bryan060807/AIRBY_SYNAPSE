import { cn } from "@/lib/utils";
import { Hexagon } from "lucide-react";

export function Logo({
  className,
  showIcon = true,
}: {
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <Hexagon className="size-6 text-primary" />}
      <h1 className="font-bold text-lg tracking-tighter text-foreground">
        Aibry <span className="text-primary/80">Synapse</span>
      </h1>
    </div>
  );
}
