"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted?: boolean; 
  status: string;
  isActive: boolean;
  
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status, 
  isActive,
  isDeleted = false,
  activeText = "Active",
  deletedText = "Inactive"
}: StatusBadgeCellProps) {
  
  const badgeVariant = isDeleted || !isActive ? "destructive" : "default";
  
  const displayText = isDeleted
    ? deletedText
    : isActive
      ? activeText
      : "Inactive";

  return (
    <Badge variant={badgeVariant} className="uppercase">
      {displayText}
    </Badge>
  );
}