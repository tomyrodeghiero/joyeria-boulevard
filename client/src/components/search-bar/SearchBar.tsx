import React from "react";
import { SEARCH_MOBILE_ICON } from "@/utils/constants";

const SearchBar = () => {
  return (
    <div className="flex search items-center bg-gray-300 rounded text-gray-700 lg:hidden py-2 mb-6 px-4">
      <img className="h-4 mr-3" src={SEARCH_MOBILE_ICON} alt="Search" />
      <input
        type="text"
        placeholder="Buscar"
        className="flex-grow bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
