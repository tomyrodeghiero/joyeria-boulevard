import TrendingProducts from "@/components/trending-products/TrendingProducts";
import CategoryTab from "@/components/category-tab/CategoryTab";
import SearchBar from "@/components/search-bar/SearchBar";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <CategoryTab />
      <TrendingProducts />
    </div>
  );
}
