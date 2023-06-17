import { DROP_DOWN_ICON, SEARCH_ICON } from "@/utils/constants";
import PriceSlider from "../price-slider/PriceSlider";

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
  return (
    <div className="relative">
      <select
        className="appearance-none border border-gray-400 rounded pl-3 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-0 focus:ring-yellow-800 focus:border-yellow-800"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="" disabled selected>
          {label}
        </option>
        {options.map((option: any, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
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

const Checkbox = ({ label, checked, setChecked }: any) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm">{label}</label>
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <div className="toggle-path bg-gray-200 w-7 h-4 rounded-full shadow-inner" />
          <div
            className={
              "toggle-circle absolute w-[0.8rem] h-[0.8rem] bg-white rounded-full shadow-none " +
              (checked ? "transform translate-x-full" : "")
            }
            style={{ top: "50%", transform: "translateY(-50%)" }}
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
    <div className="flex w-1/5 flex-col gap-5">
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
      <Checkbox label="En oferta" checked={isOnSale} setChecked={setIsOnSale} />
      <Checkbox
        label="En stock"
        checked={isOnStock}
        setChecked={setIsOnStock}
      />
    </div>
  );
};
