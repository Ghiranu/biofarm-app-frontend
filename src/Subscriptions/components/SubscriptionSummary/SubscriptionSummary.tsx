import React from "react";
import { useShoppingCartPage } from "~/Products/containers/useShoppingCartPage";
import { Spinner } from "~/shared/components";
import { Button, Box, Typography, IconButton, Stack } from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import dayjs from "dayjs";
import SubscriptionService from "../../services/subscription.service";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const SubscriptionSummary = (props: any) => {
  const {
    data,
    isLoading,
    addProductQuantityMutation,
    subtractProductQuantityMutation,
  } = useShoppingCartPage();

  const { values, handleOpenCreateSubscription } = props;

  const queryClient = useQueryClient();

  const subscriptionMutation = useMutation(
    (subscriptionData) =>
      SubscriptionService.createSubscriptions(
        subscriptionData,
        "/create-subscription"
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subscriptions"]);
        handleOpenCreateSubscription();
      },
    }
  ) as any;

  if (isLoading) {
    return <Spinner message="Loading subscription summary..." />;
  }

  const calculateTotal = (cart: any) => {
    let total = 0;
    for (const item of cart) {
      total += item.product.price * item.quantity;
    }
    return total;
  };

  const total = calculateTotal(data);

  const subscriptionData = {
    products: data,
    customerDetails: {
      city: values.city,
      street: values.street,
      apartment: values.apartment,
      county: values.county,
      phone: values.phone,
    },
    total,
    startDate: dayjs(values.startDate).format("DD/MM/YYYY"),
    endDate: dayjs(values.endDate).format("DD/MM/YYYY"),
    recurrence: values.recurrence,
  };

  return (
    <Box className="parent">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Typography variant="h4">Detalii livrare</Typography>
        <Typography color="GrayText">
          Adresa: {values?.street} ap.
          {values?.apartment}
        </Typography>
        <Typography color="GrayText">Judet: {values?.county}</Typography>
        <Typography color="GrayText">Localitate: {values?.city}</Typography>
        <Typography color="GrayText">
          Numar de telefon: {values?.phone}
        </Typography>
      </Box>
      <Box
        className="div2"
        sx={{
          border: "2px solid #f7f7f7",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <Box sx={{ display: "grid", gridGap: "10px", marginBottom: "20px" }}>
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
                      subtractProductQuantityMutation.mutate(item.product._id)
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
            onClick={() => subscriptionMutation.mutate(subscriptionData)}
          >
            Plaseaza comanda
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default SubscriptionSummary;
