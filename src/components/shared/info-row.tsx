import { ReactNode } from "react";

function InfoRow({ label, value }: { label: string; value?: string | number | ReactNode}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "N/A"}</p>
    </div>
  );
}

export default InfoRow;