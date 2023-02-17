import {
  FactCheck,
  ListOutlined,
  LogoutOutlined,
  SubscriptionsOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { UserRole } from "core/types/enums";

export const PATHS = {
  PRODUCTS: "/",
  ORDERS: "orders",
  SUBSCRIPTIONS: "subscriptions",
  LOGOUT: "logout",
  LOGIN: "login",
  REGISTER: "register",
  SHOPPING_CART: "shopping-cart",
};

export const MAIN_MENU_ITEMS = [
  {
    text: "Products",
    icon: <ListOutlined />,
    path: PATHS.PRODUCTS,
    roles: Object.values(UserRole),
  },
  {
    text: "Orders",
    icon: <FactCheck />,
    path: PATHS.ORDERS,
    roles: Object.values(UserRole),
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsOutlined />,
    path: PATHS.SUBSCRIPTIONS,
    roles: Object.values(UserRole),
  },
  {
    text: "Logout",
    icon: <LogoutOutlined />,
    path: PATHS.LOGOUT,
    roles: Object.values(UserRole),
  },
  {
    text: "ShoppingCart",
    icon: <ShoppingCartOutlined />,
    path: PATHS.SHOPPING_CART,
    roles: Object.values(UserRole),
  },
];

export const ACCESS_TOKEN = "accessToken";

export const LOCALHOST = "localhost";

export const SECURITY_TOKEN = "Bearer";

export const AUTH_SERVICE_PATH = "/auth";

export const PRODUCTS_SERVICE_PATH = "/products";

export const VALIDATION_ERROR_MESSAGE = "Valoare introdusa invalida";
