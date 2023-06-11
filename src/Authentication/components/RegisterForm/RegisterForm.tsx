import { Box, Button, TextField, Typography } from "@mui/material";

import { Controller } from "react-hook-form";
import { useRegisterForm } from "~/Authentication/containers";
import { BackgroundSVG, WavePhoto } from "~/assets";
import "./RegisterForm.scss";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { control, trigger, errors, onSubmit, handleSubmit } =
    useRegisterForm();
  return (
    <>
      <img className="wave" src={WavePhoto} />
      <div className="container">
        <div className="img">
          <img src={BackgroundSVG} />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ color: "#6C63FF" }} variant="h2">
              Bun venit
            </Typography>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field: { ref, onChange, ...field } }) => (
                <TextField
                  label="Nume utilizator"
                  variant="outlined"
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                  inputRef={ref}
                  onChange={(event) => {
                    if (errors.username) {
                      trigger("username");
                    }
                    onChange(event.target.value);
                  }}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { ref, onChange, ...field } }) => (
                <TextField
                  type="password"
                  label="Parola"
                  variant="outlined"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  inputRef={ref}
                  onChange={(event) => {
                    if (errors.password) {
                      trigger("password");
                    }
                    onChange(event.target.value);
                  }}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { ref, onChange, ...field } }) => (
                <TextField
                  type="email"
                  label="E-mail"
                  variant="outlined"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  inputRef={ref}
                  onChange={(event) => {
                    if (errors.email) {
                      trigger("password");
                    }
                    onChange(event.target.value);
                  }}
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#6C63FF",
                "&:hover": { backgroundColor: "#6C63FF" },
              }}
            >
              Inregistrare
            </Button>
            <Link style={{ textDecoration: "none" }} to="/login">
              Am cont deja
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
