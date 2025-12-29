import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface AnimatedPriceProps {
  value: string;
  className?: string;
  changeType?: "up" | "down" | "none";
}

/**
 * Animated price component with smooth color transitions
 * Shows green for price increases, red for decreases
 */
export const AnimatedPrice = React.memo<AnimatedPriceProps>(
  ({ value, className, changeType = "none" }) => {
    const colorClass = {
      up: "text-green-400",
      down: "text-red-400",
      none: "text-gray-300",
    }[changeType];

    return (
      <motion.span
        className={cn(colorClass, "transition-colors duration-500", className)}
        initial={{ scale: 1 }}
        animate={
          changeType !== "none"
            ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.3 },
              }
            : {}
        }
      >
        {value}
      </motion.span>
    );
  }
);

AnimatedPrice.displayName = "AnimatedPrice";
