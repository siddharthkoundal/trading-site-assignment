"use client";
import { memo, useState } from "react";
import { Search, Settings, Bell, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/**
 * Dashboard header with search, notifications, and settings (Organism)
 */

export const DashboardHeader = memo(function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(true);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Wallet className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                Crypto Trading Dashboard
              </h1>
              <p className="text-xs text-gray-400">Real-time token tracking</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-5" />
                  {notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-[10px]"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-gray-700 bg-gray-900">
                <div className="space-y-2">
                  <h4 className="font-semibold">Notifications</h4>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-lg bg-gray-800 p-3">
                      <p className="text-gray-300">New token listed: CRYPTO1</p>
                      <p className="text-xs text-gray-500 mt-1">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-800 p-3">
                      <p className="text-gray-300">Price alert: TOKEN2 +15%</p>
                      <p className="text-xs text-gray-500 mt-1">
                        5 minutes ago
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-800 p-3">
                      <p className="text-gray-300">Market update available</p>
                      <p className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Settings */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="size-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 border-gray-700 bg-gray-900">
                <div className="space-y-4">
                  <h4 className="font-semibold">Settings</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-refresh" className="text-sm">
                        Auto Refresh
                      </Label>
                      <Switch
                        id="auto-refresh"
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="live-updates" className="text-sm">
                        Live Price Updates
                      </Label>
                      <Switch
                        id="live-updates"
                        checked={liveUpdates}
                        onCheckedChange={setLiveUpdates}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Connect Wallet */}
            <Button className="hidden sm:flex gap-2 bg-blue-600 hover:bg-blue-700">
              <Wallet className="size-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
});
