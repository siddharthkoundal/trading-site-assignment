import { TrendingUp, TrendingDown } from "lucide-react";

export interface TokenCardProps {
  image: string;
  name: string;
  ticker: string;
  marketCap: string;
  price: string;
  timeframe: string;
  stats: {
    label: string;
    value: string;
    isPositive?: boolean;
  }[];
  badges?: {
    icon: string;
    value: string;
  }[];
  verified?: boolean;
  accentColor?: string;
}

export function TokenCard({
  image,
  name,
  ticker,
  marketCap,
  price,
  timeframe,
  stats,
  badges = [],
  verified = false,
  accentColor = "bg-blue-500",
}: TokenCardProps) {
  // Helper to render badge icon from identifier
  function renderBadgeIcon(icon: string) {
    switch (icon) {
      case "star":
        return <span>⭐</span>;
      case "fire":
        return <span>🔥</span>;
      case "trophy":
        return <span>🏆</span>;
      case "eye":
        return <span>👁️</span>;
      case "vip":
        return <span>💎</span>;
      case "trendingUp":
        return <TrendingUp className="w-3 h-3 text-yellow-400" />;
      case "zap":
        return <span>⚡</span>;
      case "flame":
        return <span>🔥</span>;
      default:
        return null;
    }
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition-colors cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`relative w-12 h-12 rounded-lg ${accentColor} overflow-hidden flex-shrink-0`}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white truncate">{name}</h3>
            {verified && (
              <svg
                className="w-3 h-3 text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">{ticker}</span>
            <span className="text-blue-400">MC</span>
            <span className="text-green-400">{marketCap}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-gray-400 text-xs mb-1">{timeframe}</div>
          <div className="text-green-400">{price}</div>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-gray-400"
            >
              {renderBadgeIcon(badge.icon)}
              <span>{badge.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 flex-wrap">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-1.5">
            {stat.isPositive !== undefined &&
              (stat.isPositive ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              ))}
            <span className="text-xs text-gray-400">{stat.label}</span>
            <span
              className={`text-xs ${
                stat.isPositive === true
                  ? "text-green-400"
                  : stat.isPositive === false
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
