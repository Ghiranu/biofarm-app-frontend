import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "~/Orders/types";
import OrderService from "~/Orders/services/order.service";

const useOrdersPage = () => {
  const { data, error, isLoading } = useQuery<Order>({
    queryKey: ["orders"],
    queryFn: () => OrderService.getOrders("get-orders"),
  });

  console.log(data, "DATA");
  return { data, error, isLoading };
};

export default useOrdersPage;
