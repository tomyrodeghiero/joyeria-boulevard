"use client";
import { DROP_DOWN_ICON } from "@/utils/constants";
import { useState } from "react";

export const FilterDropdown = ({ options, onFilter, label }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const handleOptionClick = (option: any) => {
    onFilter(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative my-4 lg:mb-0 bg-white">
      <div
        className="appearance-none border border-gray-400 rounded pl-3 pr-10 py-2 w-full text-[0.9rem] focus:outline-none focus:ring-0 focus:ring-yellow-800 focus:border-yellow-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <div className="absolute bg-white border border-gray-400 rounded mt-1 w-full z-10">
          {options.map((option: any, index: number) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 text-[0.9rem] cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-700">
        <img
          className="w-2 object-contain"
          src={DROP_DOWN_ICON}
          alt="Drop down"
        />
      </div>
    </div>
  );
};
