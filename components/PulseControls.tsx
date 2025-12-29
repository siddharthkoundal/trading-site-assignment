import { ChevronDown } from "lucide-react";

export function PulseControls() {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-black">
      <div className="flex items-center gap-3">
        <h1 className="text-white flex items-center gap-2">
          Pulse
          <span className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          </span>
          <span className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center text-xs">
            ⚙
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span className="text-sm text-gray-300">Display</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </svg>
          <span className="text-sm text-gray-300">1</span>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1" />
          </svg>
          <span className="text-sm text-gray-300">0</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
