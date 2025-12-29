import { AxiomDashboard } from "../components/templates/AxiomDashboard";
import { Toaster } from "../components/ui/sonner";

export default function Page() {
  return (
    <div className="size-full bg-black text-white">
      <AxiomDashboard />
      <Toaster position="top-right" richColors />
    </div>
  );
}
