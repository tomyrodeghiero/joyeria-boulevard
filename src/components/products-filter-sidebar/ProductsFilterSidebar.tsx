"use client";

import { FILTER_ICON, SEARCH_ICON } from "@/utils/constants";
import { useState } from "react";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";
import PriceSlider from "../price-slider/PriceSlider";

const SearchBar = ({ onSearch, searchQuery }: any) => {
  return (
    <div className="hidden lg:block lg:relative">
      <input
        type="text"
        placeholder="Buscar..."
        className="placeholder-gray-700 font-normal border-b border-gray-300 w-full pr-10 py-2"
        style={{ lineHeight: "1.5" }}
        value={searchQuery}
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

const Checkbox = ({ label, checked, setChecked, id }: any) => {
  return (
    <div className="flex justify-between items-center gap-4 lg:gap-0">
      <label className="text-base lg:text-sm">{label}</label>
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

export const ProductsFilterSidebar = ({
  searchQuery,
  onSearch,
  isOnSale,
  isOnStock,
  setIsOnSale,
  setIsOnStock,
  onSortByPrice,
  onSortByCateogory,
  onPriceChange,
}: any) => {
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="w-full lg:w-1/4 lg:flex lg:flex-col gap-5">
      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />

      <div
        className="flex lg:hidden gap-2 items-center cursor-pointer"
        onClick={toggleFilters}
      >
        <img className="h-4" src={FILTER_ICON} alt="Filters" />
        <p className="text-yellow-800">
          {isFiltersVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
        </p>
      </div>
      <div className={`${isFiltersVisible ? "" : "hidden lg:block"}`}>
        <FilterDropdown
          options={["Menor precio", "Mayor precio"]}
          onFilter={onSortByPrice}
          label="Comprar por"
        />
        <FilterDropdown
          options={[
            "Lámparas colgantes",
            "Lámparas de techo",
            "Lámparas de pie",
            "Lámparas de mesa",
            "Lámparas de pared",
            "Luces empotradas",
            "Luces de riel",
            "Tiras LED",
            "Lámparas con ventilador",
            "Luces exteriores",
            "Lámparas decorativas",
            "Luz nocturna",
            "Lámparas con sensor de movimiento",
          ]}
          onFilter={onSortByCateogory}
          label="Ordenar por"
        />
        <PriceSlider onFilter={onPriceChange} />

        <div className="flex lg:flex-col justify-between lg:gap-5">
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
      </div>
    </div>
  );
};
