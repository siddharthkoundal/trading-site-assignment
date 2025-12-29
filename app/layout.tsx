"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { store } from "@/store";
import { queryClient } from "@/utils/queryClient";
import { WebSocketProvider } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Don't preload mono font to reduce render blocking
  fallback: ["monospace"],
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Axiom Trade - Token Discovery Dashboard</title>
        <meta name="description" content="Real-time token discovery and trading dashboard with live price updates, market analysis, and HFT-style data visualization." />
        <meta name="keywords" content="crypto, trading, tokens, defi, solana, pump.fun" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        <link rel="preconnect" href="https://axiom.trade" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://axiom.trade" />
        <link rel="dns-prefetch" href="https://axiomtrading.sfo3.cdn.digitaloceanspaces.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-400">Please refresh the page</p>
              </div>
            </div>
          }
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <WebSocketProvider>
                {children}
              </WebSocketProvider>
            </QueryClientProvider>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
