import { useEffect, useState } from "react";
import ShoppingCartService from "../../services/shopping-cart.service";
import { Spinner } from "~/shared/components";
import {
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Stack,
} from "@mui/material";
import { ShoppingCart } from "~/Products/types/classes";
import { useProductStore } from "~/Products/store";
import { CustomerDetails } from "../CustomerDetails";
import { useCustomerDetails } from "~/Products/containers";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import ProductsService from "~/Products/services/products.service";
import "./ShoppingCart.scss";
import { useShoppingCartPage } from "~/Products/containers/useShoppingCartPage";
import { Controller } from "react-hook-form";

const ShoppingCartPage = () => {
  const {
    data,
    isLoading,
    addProductQuantityMutation,
    subtractProductQuantityMutation,
  } = useShoppingCartPage();
  const { control, errors, trigger, handleCheckout } = useCustomerDetails();

  if (isLoading) {
    return <Spinner message="Loading shopping cart..." />;
  }

  const calculateTotal = (cart: any) => {
    let total = 0;
    for (const item of cart) {
      total += item.product.price * item.quantity;
    }
    return total;
  };

  const total = calculateTotal(data);

  console.log(errors, "ERRORS");

  return (
    <>
      <form>
        <Box className="parent">
          <CustomerDetails
            className="div1"
            control={control}
            errors={errors}
            trigger={trigger}
          />
          <Box
            className="div2"
            sx={{
              border: "2px solid #f7f7f7",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            <Box
              sx={{ display: "grid", gridGap: "10px", marginBottom: "20px" }}
            >
              {data?.map((item) => {
                return (
                  <Box
                    key={item.product._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      border: "1px solid #f7f7f7",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    }}
                  >
                    <img
                      style={{ width: "125px", height: "100px" }}
                      src={`${import.meta.env.VITE_BASE_URL}/${
                        item?.product.image
                      }`}
                      alt="product-img"
                    />
                    <Typography>{item.product.title}</Typography>
                    <Typography
                      sx={{ color: "#858585" }}
                    >{`${item.product.price} RON`}</Typography>
                    <Box
                      sx={{
                        border: "2px solid #f7f7f7f7",
                        borderRadius: "10px",
                      }}
                    >
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() =>
                          subtractProductQuantityMutation.mutate(
                            item.product._id
                          )
                        }
                      >
                        <RemoveOutlined />
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() =>
                          addProductQuantityMutation.mutate(item.product._id)
                        }
                      >
                        <AddOutlined />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="10px"
            >
              <Typography>Total:</Typography>
              <Typography>{`${total} RON`}</Typography>
            </Stack>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={data && data?.length === 0}
                variant="contained"
                sx={{
                  backgroundColor: "#6C63FF",
                  "&:hover": { backgroundColor: "#6C63FF" },
                }}
                onClick={handleCheckout}
              >
                Plaseaza comanda
              </Button>
            </div>
          </Box>
          <Box className="div3">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Metoda de plata
            </FormLabel>
            <Controller
              render={({ field }) => (
                <RadioGroup aria-label="payment-method" {...field}>
                  <FormControlLabel
                    value="Plata la livrare"
                    control={<Radio />}
                    label="Plata la livrare"
                  />
                  <FormControlLabel
                    value="Plata online"
                    control={<Radio />}
                    label="Plata online"
                  />
                </RadioGroup>
              )}
              name="paymentMethod"
              control={control}
            />
            {errors.paymentMethod ? (
              <Typography color="error">
                {errors.paymentMethod.message}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ShoppingCartPage;
