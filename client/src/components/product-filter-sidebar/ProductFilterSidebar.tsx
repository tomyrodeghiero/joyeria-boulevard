import { DROP_DOWN_ICON, SEARCH_ICON } from "@/utils/constants";
import PriceSlider from "../price-slider/PriceSlider";
import { useState } from "react";

const SearchBar = ({ onSearch }: any) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar..."
        className="placeholder-gray-700 font-normal border-b border-gray-300 w-full pr-10 py-2"
        style={{ lineHeight: "1.5" }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <img
        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 cursor-pointer p-2"
        src={SEARCH_ICON}
        alt="Search"
      />
    </div>
  );
};

const FilterDropdown = ({ options, onFilter, label }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const handleOptionClick = (option: any) => {
    onFilter(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="appearance-none border border-gray-400 rounded pl-3 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-0 focus:ring-yellow-800 focus:border-yellow-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <div className="absolute bg-white border border-gray-200 rounded mt-1 w-full z-10">
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

const Checkbox = ({ label, checked, setChecked, id }: any) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm">{label}</label>
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <div
            className={
              "w-7 h-4 rounded-full shadow-inner " +
              (checked ? "bg-gray-700" : "bg-gray-200")
            }
          />
          <div
            className={
              "toggle-circle absolute rounded-full shadow-none " +
              (checked ? "translate-x-3 bg-gray-700" : "bg-white")
            }
          />
        </div>
      </label>
    </div>
  );
};

export const ProductFilterSidebar = ({
  onSearch,
  onSort,
  onCategory,
  isOnSale,
  isOnStock,
  setIsOnSale,
  setIsOnStock,
}: any) => {
  return (
    <div className="w-1/5 hidden lg:flex flex-col gap-5">
      <SearchBar onSearch={onSearch} />
      <FilterDropdown
        options={["Menor precio", "Mayor precio"]}
        onFilter={onCategory}
        label="Comprar por"
      />
      <FilterDropdown
        options={["Oro", "Plata", "Bronce"]}
        onFilter={onSort}
        label="Ordenar por"
      />
      <PriceSlider />
      <Checkbox
        label="En oferta"
        checked={isOnSale}
        setChecked={setIsOnSale}
        id="onSale"
      />
      <Checkbox
        label="En stock"
        checked={isOnStock}
        setChecked={setIsOnStock}
        id="onStock"
      />
    </div>
  );
};
