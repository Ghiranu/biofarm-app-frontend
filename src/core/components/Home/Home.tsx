import { Button, Box, Typography } from "@mui/material";
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
      {/* <Button onClick={() => AuthenticationService.logout("logout")}>
        Logout
      </Button> */}
      {/* <MainMenu /> */}
      <Typography sx={{ fontSize: "48px", color: "#858585" }}>
        Lista produse
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          height: "100vh",
          justifyContent: "center",
          padding: "25px",
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
