import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VALIDATION_ERROR_MESSAGE } from "shared/constants/utils";
import { AuthenticationService } from "Authentication/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "~/Authentication/contexts";

const registerValidationSchema = z.object({
  username: z.string().min(3, VALIDATION_ERROR_MESSAGE),
  password: z.string().min(3, VALIDATION_ERROR_MESSAGE),
  email: z
    .string()
    .regex(
      new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
      VALIDATION_ERROR_MESSAGE
    ),
});

export type ValidationSchema = z.infer<typeof registerValidationSchema>;

const useRegisterForm = () => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(registerValidationSchema),
  });

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const loginUserMutation = useMutation(
    (data) => AuthenticationService.login(data, "login"),
    {
      onSuccess: (data) => {
        setAuth(data);
        navigate("/");
      },
    }
  ) as any;

  const registerUserMutation = useMutation(
    (data) => AuthenticationService.register(data, "register"),
    {
      onSuccess: (data) => {
        loginUserMutation.mutate({
          username: data.username,
          password: data.password,
        });
      },
    }
  );

  const onSubmit = async (formData: any) => {
    try {
      await registerUserMutation.mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const register = handleSubmit((data) =>
    AuthenticationService.register(data, "register")
  );

  return { control, trigger, errors, register, handleSubmit, onSubmit };
};

export default useRegisterForm;
