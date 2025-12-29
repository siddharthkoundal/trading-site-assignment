import React from "react";

/**
 * Performance monitoring utilities
 * Tracks component render times and performance metrics
 */

export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  /**
   * Start measuring performance for a component
   */
  static startMeasure(componentName: string): () => void {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (!this.metrics.has(componentName)) {
        this.metrics.set(componentName, []);
      }

      this.metrics.get(componentName)!.push(duration);

      // Log slow renders (>16ms = 60fps threshold)
      if (duration > 16) {
        console.warn(
          `[Performance] ${componentName} took ${duration.toFixed(
            2
          )}ms to render`
        );
      }
    };
  }

  /**
   * Get average render time for a component
   */
  static getAverage(componentName: string): number {
    const times = this.metrics.get(componentName);
    if (!times || times.length === 0) return 0;

    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }

  /**
   * Get all performance metrics
   */
  static getMetrics(): Record<string, { avg: number; count: number }> {
    const result: Record<string, { avg: number; count: number }> = {};

    this.metrics.forEach((times, name) => {
      result[name] = {
        avg: this.getAverage(name),
        count: times.length,
      };
    });

    return result;
  }

  /**
   * Clear all metrics
   */
  static clear(): void {
    this.metrics.clear();
  }

  /**
   * Report metrics to console
   */
  static report(): void {
    const metrics = this.getMetrics();
    console.table(metrics);
  }
}

/**
 * Hook for measuring component render time
 */
export function usePerformanceMonitor(componentName: string) {
  if (process.env.NODE_ENV === "development") {
    const endMeasure = PerformanceMonitor.startMeasure(componentName);
    return endMeasure;
  }
  return () => {};
}

/**
 * HOC for automatic performance monitoring
 */
export function withPerformanceMonitor<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
): React.ComponentType<P> {
  const name =
    componentName || Component.displayName || Component.name || "Unknown";

  const WrappedComponent = (props: P) => {
    let endMeasure: (() => void) | undefined;
    if (process.env.NODE_ENV === "development") {
      endMeasure = PerformanceMonitor.startMeasure(name);
    }

    React.useEffect(() => {
      if (process.env.NODE_ENV === "development" && endMeasure) {
        endMeasure();
      }
    });

    return React.createElement(Component, props);
  };
  WrappedComponent.displayName = `WithPerformanceMonitor(${name})`;
  return WrappedComponent;
}
