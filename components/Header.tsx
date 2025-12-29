import { Search, ChevronDown, Bell, Star, Wallet } from "lucide-react";

export function Header() {
  return (
    <div className="bg-black border-b border-gray-800">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded" />
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discover
            </a>
            <a href="#" className="text-blue-500">
              Pulse
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Trackers
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Perpetuals
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Yield
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Vision
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Rewards
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
            <span className="text-sm text-gray-300">SQL</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
            Deposit
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Star className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
            <Wallet className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">0</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
            <span className="text-sm text-gray-300">0.0</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-blue-500" />
        </div>
      </div>
    </div>
  );
}
