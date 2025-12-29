"use client";
import { Button } from "@/components/ui/button";
import { RiSettings3Line, RiStarLine, RiLineChartLine } from "react-icons/ri";

export default function TableToolbar() {
  return (
    <div className="hidden sm:block">
      <div className="grayscale-30 hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-7 gap-2 px-4 pb-px overflow-hidden border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="min-w-6 min-h-6 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 rounded-lg"
          >
            <RiSettings3Line className="text-[14px]" />
          </Button>
        </div>
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="min-w-6 min-h-6 text-zinc-600 hover:text-blue-600 hover:bg-zinc-200 rounded-lg"
          >
            <RiStarLine className="text-[14px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="min-w-6 min-h-6 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 rounded-lg"
          >
            <RiLineChartLine className="text-[14px]" />
          </Button>
        </div>
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
        <div className="flex flex-row justify-start items-center flex-1 overflow-hidden">
          {/* Ticker/scrollable area placeholder */}
          <div className="h-full flex flex-row gap-px pt-px items-center overflow-x-auto"></div>
        </div>
      </div>
    </div>
  );
}
