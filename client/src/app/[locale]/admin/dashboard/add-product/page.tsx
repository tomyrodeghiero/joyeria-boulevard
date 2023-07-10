import AddProduct from "@/components/add-product/AddProduct";
import DashboardLayout from "@/dashboard/layout";
import DashboardProvider from "@/dashboard/provider/context";

export default function CalendarPage() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <AddProduct />
      </DashboardLayout>
    </DashboardProvider>
  );
}
