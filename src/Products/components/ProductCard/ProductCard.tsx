import React, { useContext, useState } from "react";
import { Box, IconButton, Snackbar, Stack } from "@mui/material";
import { Button, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ProductsService from "~/Products/services/products.service";
import { useEditProduct } from "~/Products/containers";
import EditProductModal from "../EditProductModal/EditProductModal";
import { AuthContext } from "Authentication/contexts";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

import Circle from "@mui/icons-material/Circle";
import { CustomDialog } from "shared/components";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

const ProductCard: React.FC<any> = (props: any) => {
  const { auth } = useContext(AuthContext);

  const isUserAdmin = auth.roles === "ADMIN";

  const { product } = props;
  const { isModalOpen, handleEditProductModal } = useEditProduct();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirmDialog = () =>
    setIsConfirmDialogOpen((prev: boolean) => !prev);

  const handleOpenSnackbar = () => setOpen((prev) => !prev);

  return (
    <>
      <Box
        key={product?._id}
        sx={{
          width: "250px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          border: "1px solid #E4E2FF",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          justifyContent: "space-evenly",
        }}
      >
        {isUserAdmin ? (
          <Stack direction="row" justifyContent="flex-end" width="100%">
            <IconButton aria-label="edit" onClick={handleEditProductModal}>
              <EditOutlined />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleConfirmDialog}>
              <DeleteOutlineOutlined />
            </IconButton>
          </Stack>
        ) : null}
        <img
          style={{
            height: "120px",
            width: "140px",
          }}
          src={`${import.meta.env.VITE_BASE_URL}/${product?.image}`}
          alt={product?.title}
        />
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
          disabled={!product?.inStock}
          sx={{
            backgroundColor: "#6C63FF",
            "&:hover": { backgroundColor: "#6C63FF" },
          }}
          onClick={() =>
            ProductsService.addCartProduct(
              { productId: product?._id, quantity: 1 },
              "add-cart-product"
            ).then(() => handleOpenSnackbar())
          }
        >
          Adauga in cos
        </Button>
        {isModalOpen ? (
          <EditProductModal
            product={product}
            isModalOpen={isModalOpen}
            handleEditProductModal={handleEditProductModal}
          />
        ) : null}
        <CustomDialog
          open={isConfirmDialogOpen}
          handleConfirmAction={() =>
            ProductsService.deleteProduct(`delete-product/${product._id}`)
          }
          handleCloseAction={handleConfirmDialog}
        >
          Sunteti sigur ca doriti sa stergeti acest produs?
        </CustomDialog>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleOpenSnackbar}
        >
          <Alert
            onClose={handleOpenSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Produs adaugat cu sucess!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ProductCard;
