"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { store } from "@/store";
import { queryClient } from "@/utils/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              {children}
            </QueryClientProvider>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
