"use client";

import { formatDate } from "@/utils/formatter";

interface DateCellProps {
  date?: string;
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm">{formatDate(date!)}</span>;
}