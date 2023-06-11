import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  LoginForm,
  PersistLogin,
  RegisterForm,
} from "./Authentication/components";
import { Home } from "./core/components";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import { OrdersPage } from "./Orders/components";
import { AddProductPage } from "./Products/components/AddProductPage";
import { ShoppingCartPage } from "./Products/components/ShoppingCartPage";
import { SubscriptionStepper } from "./Subscriptions/components";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />

      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="add-product" element={<AddProductPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="subscriptions" element={<SubscriptionStepper />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="shopping-cart" element={<ShoppingCartPage />} />
        </Route>
      </Route>

      {/* catch all */}
      {/* <Route path="*" element={<Missing />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
