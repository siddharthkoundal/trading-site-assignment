import { Plus } from "lucide-react";

interface ColumnSectionProps {
  title: string;
  count: number;
  filters?: string[];
  children: React.ReactNode;
}

export function ColumnSection({
  title,
  count,
  filters = [],
  children,
}: ColumnSectionProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <h2 className="text-white">{title}</h2>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">▲</span>
            <span className="text-gray-400">{count}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="px-2 py-0.5 text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
            >
              {filter}
            </button>
          ))}
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">{children}</div>
    </div>
  );
}
