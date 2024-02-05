import { Auth, Checkout, CustomizeProduct, Home, MyOrders } from "../../pages";

export const navigationItems = [
  {
    name: "Inicio",
    path: "/home",
    url: "/home",
    exact: true,
    isPrivate: false,
    element: Home,
    inSidebar: true,
  },
  // {
  //   name: "Categorias",
  //   path: "/",
  //   url: "/",
  //   exact: true,
  //   isPrivate: false,
  //   element: Home,
  //   inSidebar: true,
  // },
  // {
  //   name: "Blog",
  //   path: "/",
  //   url: "/",
  //   exact: true,
  //   isPrivate: false,
  //   element: Home,
  //   inSidebar: true,
  // },
  // {
  //   name: "Contacto",
  //   path: "/",
  //   url: "/",
  //   exact: true,
  //   isPrivate: false,
  //   element: Home,
  //   inSidebar: true,
  // },
  {
    name: "Carrito",
    path: "/checkout",
    url: "/checkout",
    exact: true,
    isPrivate: true,
    element: Checkout,
    inSidebar: false,
  },
  {
    name: "Mis Pedidos",
    path: "/my-orders",
    url: "/my-orders",
    exact: true,
    isPrivate: true,
    element: MyOrders,
    inSidebar: false,
  },
  {
    name: "Login",
    path: "/auth",
    url: "/auth",
    exact: true,
    isPrivate: false,
    element: Auth,
    inSidebar: false,
  },
  {
    name: "Personalizar",
    path: "/customize",
    url: "/customize",
    exact: true,
    isPrivate: false,
    element: CustomizeProduct,
    inSidebar: false,
  },
];