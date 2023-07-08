import ProductsManagementIcon from "./icons/home";
import AddProductIcon from "./icons/projects";
import TimeManageIcon from "./icons/time-manage";

const data = [
  {
    title: "Gestión de Productos",
    icon: <ProductsManagementIcon />,
    link: "/admin/dashboard",
  },
  {
    title: "Añadir un Producto",
    icon: <AddProductIcon />,
    link: "/admin/dashboard/add-product",
  },
  {
    title: "Cerrar Sesión",
    icon: <TimeManageIcon />,
    link: "/admin",
  },
];

export default data;
