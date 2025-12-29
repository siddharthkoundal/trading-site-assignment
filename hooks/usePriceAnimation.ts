import { useEffect, useRef } from "react";
import { useState } from "react";
/**
 * Hook to detect price change and trigger color animation
 * Returns the current animation state
 */
export function usePriceAnimation(value: string | number) {
  const prevValue = useRef(value);
  const [animationState, setAnimationState] = useState<"up" | "down" | "none">(
    "none"
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const current =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
        : value;
    const previous =
      typeof prevValue.current === "string"
        ? parseFloat(prevValue.current.replace(/[^0-9.-]+/g, ""))
        : prevValue.current;

    if (current > previous) {
      setTimeout(() => setAnimationState("up"), 0);
    } else if (current < previous) {
      setTimeout(() => setAnimationState("down"), 0);
    }

    prevValue.current = value;

    // Reset animation state after duration
    if (current !== previous) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setAnimationState("none");
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return animationState;
}
