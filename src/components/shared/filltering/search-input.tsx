"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  queryKey?: string;
}

export default function SearchInput({ 
  placeholder = "Search...", 
  queryKey = "searchTerm" 
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // URL থেকে ইনিশিয়াল ভ্যালু নিচ্ছি
  const initialSearch = searchParams.get(queryKey) || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // ১. বর্তমান URL প্যারামস কপি করা
      const params = new URLSearchParams(searchParams.toString());
      
      const currentUrlValue = params.get(queryKey) || "";

      if (currentUrlValue === searchValue) {
        return;
      }

      // ৩. আপডেট লজিক
      if (searchValue) {
        params.set(queryKey, searchValue);
      } else {
        params.delete(queryKey);
      }
      
      // নতুন সার্চ হলে পেজ ১ এ রিসেট
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, router, pathname, searchParams, queryKey]); 

  return (
    <div className="relative w-full md:w-72">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 bg-background"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}