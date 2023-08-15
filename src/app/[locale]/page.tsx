import TrendingProducts from "@/components/trending-products/TrendingProducts";
import CategoryTab from "@/components/category-tab/CategoryTab";

export default function Home() {
  return (
    <div>
      <CategoryTab />
      <TrendingProducts />
    </div>
  );
}
