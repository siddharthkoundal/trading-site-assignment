import { memo } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Loading spinner component (Atomic)
 */

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner = memo(function LoadingSpinner({
  className,
  size = 24,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-gray-400", className)}
      style={{ width: size, height: size }}
    />
  );
});
