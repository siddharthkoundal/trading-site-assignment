"use client";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Animated price display with color transitions (Atomic)
 * Shows smooth color changes when price updates
 */

interface PriceDisplayProps {
  price: string;
  className?: string;
  lastUpdate?: number;
}

export const PriceDisplay = memo(function PriceDisplay({
  price,
  className,
  lastUpdate,
}: PriceDisplayProps) {
  const [previousPrice, setPreviousPrice] = useState(price);
  const [priceDirection, setPriceDirection] = useState<
    "up" | "down" | "neutral"
  >("neutral");

  useEffect(() => {
    if (price !== previousPrice) {
      const current = parseFloat(price.replace(/[^0-9.]/g, ""));
      const previous = parseFloat(previousPrice.replace(/[^0-9.]/g, ""));

      if (current > previous) {
        setPriceDirection("up");
      } else if (current < previous) {
        setPriceDirection("down");
      }

      setPreviousPrice(price);

      // Reset color after animation
      const timeout = setTimeout(() => {
        setPriceDirection("neutral");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [price, previousPrice, lastUpdate]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={price}
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: 1,
          y: 0,
          color:
            priceDirection === "up"
              ? "#10b981"
              : priceDirection === "down"
              ? "#ef4444"
              : "#ffffff",
        }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3 }}
        className={cn("font-mono", className)}
      >
        {price}
      </motion.span>
    </AnimatePresence>
  );
});
