import { memo } from "react";
import { cn } from "@/utils/cn";

/**
 * Shimmer loading effect component (Atomic)
 * Provides a smooth animated loading state
 */

interface ShimmerProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Shimmer = memo(function Shimmer({
  className,
  width = "w-full",
  height = "h-4",
}: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]",
        width,
        height,
        className
      )}
      style={{
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
});

// Add shimmer animation to global styles if not present
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  if (!document.querySelector("style[data-shimmer]")) {
    style.setAttribute("data-shimmer", "true");
    document.head.appendChild(style);
  }
}
