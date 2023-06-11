import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "~/Orders/types";
import OrderService from "~/Orders/services/order.service";
import { useQueryClient } from "@tanstack/react-query";

const useOrdersPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.getOrders("get-orders"),
  });

  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId) =>
      OrderService.cancelOrder(`cancel-order/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return { data, error, isLoading, cancelOrderMutation };
};

export default useOrdersPage;
