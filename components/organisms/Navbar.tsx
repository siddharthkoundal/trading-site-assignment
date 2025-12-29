"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  RiSearch2Line,
  RiArrowDownSLine,
  RiNotification3Line,
  RiWalletLine,
  RiUserSettingsLine,
  RiStarLine,
  RiGlobalLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex flex-row w-full h-13 sm:h-16 min-h-12 sm:min-h-16 px-4 sm:px-4 lg:px-6 gap-4 sm:gap-4 lg:gap-6 justify-between items-center overflow-hidden">
        {/* Left: Logo and menu */}
        <div className="flex flex-row items-center gap-2 shrink-0 w-9 sm:w-6 2xl:w-32.5">
          {/* Logo SVG */}
          <Link href="/">
            <div className="flex flex-row items-center">
              <span className="2xl:block ml-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Eterna Labs
              </span>
            </div>
          </Link>
        </div>
        {/* Scrollable menu */}
        <div className="relative flex flex-1 min-w-0">
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-1">
                {[
                  { name: "Discover", href: "#" },
                  { name: "Pulse", href: "/pulse" },
                  { name: "Trackers", href: "#" },
                  { name: "Perpetuals", href: "#" },
                  { name: "Yield", href: "#" },
                  { name: "Vision", href: "#" },
                  { name: "Portfolio", href: "#" },
                  { name: "Rewards", href: "#" },
                ].map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`flex h-8 px-2 xl:px-4 items-center rounded-lg text-[14px] font-medium text-zinc-900 dark:text-zinc-100 hover:bg-blue-100 hover:text-blue-600 transition`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex flex-row gap-4 items-center">
          {/* Search */}
          <Button
            variant="outline"
            className="hidden sm:flex h-8 px-2 rounded-full items-center gap-2"
          >
            <RiSearch2Line className="text-[18px] text-zinc-500" />
            <span className="text-xs text-zinc-500">
              Search by token or CA...
            </span>
          </Button>
          {/* Chain selector */}
          <Button
            variant="outline"
            className="flex h-8 px-2 rounded-full items-center gap-1"
          >
            <RiGlobalLine className="text-[18px] text-zinc-500 mr-1" />
            <span className="text-[14px] font-medium">SOL</span>
            <RiArrowDownSLine className="text-[18px] text-zinc-500 ml-1" />
          </Button>
          {/* Deposit button */}
          <Button className="bg-blue-600 text-white h-8 px-3 rounded-full font-bold hidden sm:flex items-center">
            Deposit
          </Button>
          {/* Notification */}
          <Button
            variant="outline"
            className="flex h-8 w-8 rounded-full items-center justify-center"
          >
            <RiNotification3Line className="text-[18px] text-zinc-500" />
          </Button>
          {/* Wallet */}
          <Button
            variant="outline"
            className="flex h-8 w-8 rounded-full items-center justify-center"
          >
            <RiWalletLine className="text-[18px] text-zinc-500" />
          </Button>
          {/* User settings */}
          <Button
            variant="outline"
            className="flex h-8 w-8 rounded-full items-center justify-center"
          >
            <RiUserSettingsLine className="text-[18px] text-zinc-500" />
          </Button>
          {/* Star */}
          <Button
            variant="outline"
            className="flex h-8 w-8 rounded-full items-center justify-center"
          >
            <RiStarLine className="text-[18px] text-zinc-500" />
          </Button>
          {/* User avatar placeholder */}
          <Button
            variant="outline"
            className="flex h-7 w-7 rounded-full items-center justify-center overflow-hidden"
          >
            {/* Add user avatar SVG or image here */}
          </Button>
        </div>
      </div>
    </nav>
  );
}
