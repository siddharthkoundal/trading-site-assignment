import { CryptoTradingDashboard } from "../components/templates/CryptoTradingDashboard";
import { Toaster } from "../components/ui/sonner";

export default function Page() {
  return (
    <div className="size-full bg-black text-white">
      <CryptoTradingDashboard />
      <Toaster position="top-right" richColors />
    </div>
  );
}
