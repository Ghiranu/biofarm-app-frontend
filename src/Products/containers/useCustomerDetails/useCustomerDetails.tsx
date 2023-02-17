import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VALIDATION_ERROR_MESSAGE } from "shared/constants/utils";
import ShoppingCartService from "../../services/shopping-cart.service";

const customerDetailsSchema = z.object({
  city: z.string().min(1, { message: VALIDATION_ERROR_MESSAGE }),
  street: z.string().min(1, { message: VALIDATION_ERROR_MESSAGE }),
  county: z.string().min(1, { message: VALIDATION_ERROR_MESSAGE }),
  apartment: z.string().min(1, { message: VALIDATION_ERROR_MESSAGE }),
  phone: z.string().min(1, { message: VALIDATION_ERROR_MESSAGE }),
});

export type ValidationSchema = z.infer<typeof customerDetailsSchema>;

const useCustomerDetails = () => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(customerDetailsSchema),
  });

  const handleCheckout = handleSubmit((data) => {
    return ShoppingCartService.proceedCheckout(data, "proceed-checkout").then(
      (url) => {
        window.location.href = url.url;
      }
    );
  });

  return { control, trigger, errors, handleSubmit, handleCheckout };
};

export default useCustomerDetails;
