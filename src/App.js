import "./App.css";
import { Header, AuthForm } from "./core";
import { Outlet } from "react-router-dom";
import ProductCard from "./core/components/ProductCard/ProductCard";

function App() {
  return (
    <div>
      <Header />
      <ProductCard />
      {/* <AuthForm /> */}
      <Outlet />
    </div>
  );
}

export default App;
