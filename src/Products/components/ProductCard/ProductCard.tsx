import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button, Typography } from "@mui/material";
import ProductsService from "~/Products/services/products.service";
import { useEditProduct } from "~/Products/containers";
import EditProductModal from "../EditProductModal/EditProductModal";

import Circle from "@mui/icons-material/Circle";

const ProductCard: React.FC<any> = (props: any) => {
  const [quantity, setQuantity] = useState("");
  const { product } = props;
  const { isModalOpen, handleEditProductModal } = useEditProduct();

  return (
    <>
      <Box
        key={product?._id}
        sx={{
          width: "250px",
          height: "320px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
          border: "1px solid #E4E2FF",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <img
          style={{
            height: "100px",
            width: "140px",
          }}
          src={`${import.meta.env.VITE_BASE_URL}/${product?.image}`}
          alt="cartofi"
        />
        {/* <Stack gap="20px" width="100%" alignItems="center"> */}
        <Typography sx={{ fontSize: "18px" }} variant="h3">
          {product?.title}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#858585" }} variant="h4">
          {product?.price + " RON"}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Circle color={product.inStock ? "success" : "error"} />
          <span>{product.inStock ? "In stoc" : "Indisponibil"} </span>
        </Box>
        <Button
          variant="contained"
          onClick={() =>
            ProductsService.addCartProduct(
              { productId: product?._id, quantity: 1 },
              "add-cart-product"
            )
          }
        >
          Adauga in cos
        </Button>
        {/* <Button variant="contained" onClick={handleEditProductModal}>
          Editeaza produs
        </Button> */}
        <Button
          variant="contained"
          onClick={() =>
            ProductsService.deleteProduct(`delete-product/${product._id}`)
          }
        >
          Sterge produs
        </Button>
        {/* </FormControl> */}
        {/* </Stack> */}
        {/* {isModalOpen ? (
          <EditProductModal
            product={product}
            isModalOpen={isModalOpen}
            handleEditProductModal={handleEditProductModal}
          />
        ) : null} */}
      </Box>
    </>
  );
};

export default ProductCard;
