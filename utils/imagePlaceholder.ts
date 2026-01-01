/**
 * Generate lightweight placeholder images for tokens
 * Uses SVG data URIs for instant loading (no network request)
 * Works in both browser and server environments
 */

/**
 * Generate a simple solid color placeholder
 * Uses HSL colors for consistent, visually appealing placeholders
 * Returns data URI that loads instantly (no network request)
 */
export function generateSimplePlaceholder(tokenId: string, size: number = 200): string {
  const hash = tokenId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate a hue based on token ID (consistent for same token)
  const hue = hash % 360;
  const saturation = 55 + (hash % 25); // 55-80%
  const lightness = 40 + (hash % 20);  // 40-60%
  
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
  // Create minimal SVG with solid color
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  
  // Use encodeURIComponent for safer encoding (works in all browsers)
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generate a gradient placeholder (slightly larger but more visually appealing)
 */
export function generateGradientPlaceholder(tokenId: string, size: number = 200): string {
  const hash = tokenId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create a palette of nice gradient colors
  const gradients = [
    { start: '#9945FF', end: '#14F195' }, // Solana
    { start: '#FF6B35', end: '#F7931E' }, // Orange
    { start: '#667EEA', end: '#764BA2' }, // Purple
    { start: '#F093FB', end: '#F5576C' }, // Pink
    { start: '#4FACFE', end: '#00F2FE' }, // Blue
    { start: '#43E97B', end: '#38F9D7' }, // Green
  ];
  
  const gradient = gradients[hash % gradients.length];
  
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g${hash}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${gradient.start}"/><stop offset="100%" stop-color="${gradient.end}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g${hash})"/></svg>`;
  
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Get placeholder image for a token
 * Uses simple placeholder for best performance (smallest size, fastest)
 */
export function getTokenPlaceholder(tokenId: string): string {
  return generateSimplePlaceholder(tokenId, 200);
}

