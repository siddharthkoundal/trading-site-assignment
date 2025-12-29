import { memo } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Verified badge with tooltip (Atomic)
 */

interface VerifiedBadgeProps {
  verified?: boolean;
}

export const VerifiedBadge = memo(function VerifiedBadge({
  verified,
}: VerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <CheckCircle2 className="size-4 text-blue-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Verified Token</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
