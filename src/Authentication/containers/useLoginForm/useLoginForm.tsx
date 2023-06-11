import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VALIDATION_ERROR_MESSAGE } from "shared/constants/utils";
import { useContext } from "react";
import { AuthenticationService } from "Authentication/services";
import { AuthContext } from "Authentication/contexts";
import { useNavigate } from "react-router-dom";

const loginValidationSchema = z.object({
  username: z.string().min(3, VALIDATION_ERROR_MESSAGE),
  password: z.string().min(3, VALIDATION_ERROR_MESSAGE),
});

export type ValidationSchema = z.infer<typeof loginValidationSchema>;

const useLoginForm = () => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(loginValidationSchema),
  });

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const login = handleSubmit((data) =>
    AuthenticationService.login(data, "login").then((data: any) => {
      setAuth(data);
      navigate("/");
    })
  );

  return { control, trigger, errors, login };
};

export default useLoginForm;
