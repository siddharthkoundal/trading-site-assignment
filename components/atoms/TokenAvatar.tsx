import React from "react";
import { cn } from "@/utils/cn";

interface TokenAvatarProps {
  src: string;
  alt: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

/**
 * Token avatar with accent color background
 * Optimized for performance with memo
 */
export const TokenAvatar = React.memo<TokenAvatarProps>(
  ({ src, alt, accentColor = "bg-blue-500", size = "md", className }) => {
    return (
      <div
        className={cn(
          "relative rounded-lg overflow-hidden flex-shrink-0",
          accentColor,
          sizeClasses[size],
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
);

TokenAvatar.displayName = "TokenAvatar";
