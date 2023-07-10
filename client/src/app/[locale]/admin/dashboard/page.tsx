import ProductsManagement from "@/components/products-management/ProductsManagement";
import DashboardLayout from "@/dashboard/layout";
import DashboardProvider from "@/dashboard/provider/context";

export default function CalendarPage() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <ProductsManagement />
      </DashboardLayout>
    </DashboardProvider>
  );
}
