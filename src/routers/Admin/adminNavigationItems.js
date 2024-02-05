import { AdminAdd, AdminOrders, Home } from "../../pages";

export const adminNavigationItems = [
  {
    name: "Inicio",
    path: "/",
    url: "/admin",
    exact: true,
    isPrivate: true,
    element: Home,
    inSidebar: true,
  },
  {
    name: "Agregar Producto",
    path: "/add-product",
    url: "/admin/add-product",
    exact: true,
    isPrivate: true,
    element: AdminAdd,
    inSidebar: true,
  },
  {
    name: "Pedidos",
    path: "/orders",
    url: "/admin/orders",
    exact: true,
    isPrivate: false,
    element: AdminOrders,
    inSidebar: true,
  },
];
