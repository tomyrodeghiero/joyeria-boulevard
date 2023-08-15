"use client";

import React, { useState } from "react";
import { SEARCH_MOBILE_ICON } from "@/utils/constants";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/shop?search=${searchQuery}`);
  };

  return (
    <div className="flex search mt-3 items-center bg-gray-300 rounded text-gray-700 lg:hidden py-2 px-4">
      <img className="h-4 mr-3" src={SEARCH_MOBILE_ICON} alt="Search" />
      <input
        type="text"
        className="flex-grow bg-transparent"
        placeholder="Buscar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
