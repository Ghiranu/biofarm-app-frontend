import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VALIDATION_ERROR_MESSAGE } from "shared/constants/utils";
import ShoppingCartService from "../../services/shopping-cart.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const customerDetailsSchema = z.object({
  city: z.string({ required_error: VALIDATION_ERROR_MESSAGE }),
  street: z.string({ required_error: VALIDATION_ERROR_MESSAGE }),
  county: z.string({ required_error: VALIDATION_ERROR_MESSAGE }),
  apartment: z
    .string({ required_error: VALIDATION_ERROR_MESSAGE })
    .regex(new RegExp("^[0-9]*$"), {
      message: "Apartamentul trebuie sa contina doar cifre.",
    }),
  phone: z
    .string({ required_error: VALIDATION_ERROR_MESSAGE })
    .regex(new RegExp("^[0-9]*$"), {
      message: "Numarul de telefon trebuie sa contina doar cifre.",
    }),
  paymentMethod: z
    .string({ required_error: "Selecteaza o metoda de plata." })
    .optional(),
  startDate: z
    .string({ required_error: "Selecteaza o data de incepere." })
    .optional(),
  endDate: z
    .string({ required_error: "Selecteaza o data de incheiere." })
    .optional(),
  recurrence: z
    .string({ required_error: "Selecteaza recurenta de livrare." })
    .optional(),
});

export type ValidationSchema = z.infer<typeof customerDetailsSchema>;

const useCustomerDetails = () => {
  const {
    control,
    trigger,
    formState: { errors, isSubmitted },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(customerDetailsSchema),
  });

  const navigate = useNavigate();
  const values = getValues();

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted]);

  const handleCheckout = handleSubmit((data) => {
    return ShoppingCartService.proceedCheckout(data, "proceed-checkout").then(
      (url) => {
        if (url?.url) {
          return (window.location.href = url.url);
        } else {
          navigate("/orders");
        }
      }
    );
  });

  return { control, trigger, errors, handleSubmit, handleCheckout, values };
};

export default useCustomerDetails;
