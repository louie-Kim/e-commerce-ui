"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    // ring-1: 테두리 효과
    // <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1">
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      {/* <Search className="w-4 h-4 text-gray-500" /> */}
      <input
        id="search"
        type="text"
        className="text-sm outline-0"
        placeholder="Search.."
      />
      <label htmlFor="search" className="">
        <Search className="w-4 h-4 text-gray-500" />
      </label>
    </div>
  );
};

export default SearchBar;
