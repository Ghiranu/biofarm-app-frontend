import { Button, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { AuthenticationService } from "Authentication/services";
import { ProductCard } from "Products";
import ProductsService from "~/Products/services/products.service";
import { useQuery } from "@tanstack/react-query";

const Home: React.FC = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts("get-products"),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>HOME</h1>
      <Button onClick={() => AuthenticationService.logout("logout")}>
        Logout
      </Button>
      {/* <MainMenu /> */}
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {data?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </Box>
      <Outlet />
    </>
  );
};

export default Home;
