import ProductsManagementIcon from "./icons/home";
import AddProductIcon from "./icons/projects";
import TimeManageIcon from "./icons/time-manage";
import InstagramDashboardIcon from "./icons/instagram";
import CreditCardIcon from "./icons/credit-card";

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
    title: "Publicar en Instagram",
    icon: <InstagramDashboardIcon />,
    link: "/admin/dashboard",
  },
  {
    title: "Tarjeta de Crédito",
    icon: <CreditCardIcon />,
    link: "/admin/dashboard",
  },
  {
    title: "Cerrar Sesión",
    icon: <TimeManageIcon />,
    link: "/admin/dashboard",
  },
];

export default data;
