"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { getTokenPlaceholder } from "@/utils/imagePlaceholder";

interface OptimizedTokenImageProps {
  src: string | undefined;
  alt: string;
  tokenId: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  quality?: number;
}

/**
 * Optimized token image component with instant-loading placeholder fallback
 * - Uses data URI placeholders for instant rendering (no network request)
 * - Falls back to placeholder if external image fails to load
 * - Improves LCP by showing content immediately
 */
export const OptimizedTokenImage = React.memo<OptimizedTokenImageProps>(
  ({
    src,
    alt,
    tokenId,
    width,
    height,
    className,
    fill = false,
    priority = false,
    loading = "lazy",
    sizes,
    quality = 75,
  }) => {
    // Generate placeholder immediately (no async, instant)
    const placeholder = useMemo(() => getTokenPlaceholder(tokenId), [tokenId]);

    // Use placeholder if no src provided, or if it's already a data URI
    const imageSrc = src && !src.startsWith("data:") ? src : placeholder;
    const [hasError, setHasError] = useState(false);
    const finalSrc = hasError ? placeholder : imageSrc;

    // For data URIs, Next.js Image might not work, so use regular img
    const isDataUri = finalSrc.startsWith("data:");

    if (isDataUri) {
      if (fill) {
        return (
          <img
            src={finalSrc}
            alt={alt}
            className={className}
            style={{ objectFit: "cover" }}
            onError={() => setHasError(true)}
          />
        );
      }
      return (
        <img
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{ objectFit: "cover" }}
          onError={() => setHasError(true)}
        />
      );
    }

    // Use Next.js Image for external URLs (with optimization)
    if (fill) {
      return (
        <Image
          src={finalSrc}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
          loading={loading}
          quality={quality}
          onError={() => setHasError(true)}
        />
      );
    }

    return (
      <Image
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={loading}
        quality={quality}
        onError={() => setHasError(true)}
      />
    );
  }
);

OptimizedTokenImage.displayName = "OptimizedTokenImage";

