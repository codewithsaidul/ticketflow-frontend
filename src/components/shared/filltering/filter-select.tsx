"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterSelectProps {
  placeholder: string;
  options: { label: string; value: string }[];
  queryKey: string;
}

export default function FilterSelect({ 
  placeholder, 
  options, 
  queryKey 
}: FilterSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentValue = searchParams.get(queryKey) || "";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(queryKey, value);
    } else {
      params.delete(queryKey);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={currentValue} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-full md:w-[180px] cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="cursor-pointer">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}