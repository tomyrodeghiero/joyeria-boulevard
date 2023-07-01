import { CATEGORIES, SEARCH_ICON } from "@/utils/constants";
import PriceSlider from "../price-slider/PriceSlider";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";

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
  isOnSale,
  isOnStock,
  setIsOnSale,
  setIsOnStock,
  onSortByPrice,
  onSortByCateogory,
  onPriceChange,
}: any) => {
  return (
    <div className="w-1/4 hidden lg:flex flex-col gap-5">
      <SearchBar onSearch={onSearch} />
      <FilterDropdown
        options={["Menor precio", "Mayor precio"]}
        onFilter={onSortByPrice}
        label="Comprar por"
      />
      <FilterDropdown
        options={CATEGORIES}
        onFilter={onSortByCateogory}
        label="Ordenar por"
      />
      <PriceSlider onFilter={onPriceChange} />
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
