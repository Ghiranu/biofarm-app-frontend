import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import ProductsService from "~/Products/services/products.service";
import ShoppingCartService from "~/Products/services/shopping-cart.service";

const useShoppingCartPage = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["shopping-cart"],
    queryFn: () => ShoppingCartService.getCartProducts("get-cart-products"),
  });

  const queryClient = useQueryClient();

  const addProductQuantityMutation = useMutation({
    mutationFn: (productId) =>
      ProductsService.addCartProduct(
        {
          productId,
        },
        "add-cart-product"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const subtractProductQuantityMutation = useMutation({
    mutationFn: (productId) =>
      ProductsService.subtractProductQuantity(
        {
          productId,
        },
        "subtract-product-quantity"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  return {
    data,
    isLoading,
    addProductQuantityMutation,
    subtractProductQuantityMutation,
  };
};

export default useShoppingCartPage;
