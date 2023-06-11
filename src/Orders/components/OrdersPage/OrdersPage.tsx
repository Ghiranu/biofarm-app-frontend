import { Box } from "@mui/material";
import { useOrdersPage } from "~/Orders/containers";
import { Spinner } from "~/shared/components";
import { OrderDetailsPage } from "../OrderDetailsPage";

const OrdersPage = () => {
  const { data, error, isLoading, cancelOrderMutation } = useOrdersPage();

  if (isLoading) {
    return <Spinner message="Loading..." />;
  }

  return (
    <Box sx={{ padding: "40px" }}>
      <ul>
        {(data as any)?.map((item: any) => {
          return (
            <OrderDetailsPage
              key={item._id}
              item={item}
              cancelOrderMutation={cancelOrderMutation}
            />
          );
        })}
      </ul>
    </Box>
  );
};

export default OrdersPage;
