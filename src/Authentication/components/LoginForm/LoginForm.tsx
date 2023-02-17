import { Box, Button, TextField } from "@mui/material";
import { BackgroundSVG, WavePhoto } from "~/assets";
import React from "react";
import { Controller } from "react-hook-form";
import { useLoginForm } from "Authentication/containers";
import "../RegisterForm/RegisterForm.scss";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { control, trigger, errors, login } = useLoginForm();

  return (
    <>
      <img className="wave" src={WavePhoto} />
      <div className="container">
        <div className="img">
          <img src={BackgroundSVG} />
        </div>
        <div className="login-content">
          <form onSubmit={login}>
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
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#6C63FF",
                "&:hover": { backgroundColor: "#6C63FF" },
              }}
            >
              Logare
            </Button>
            <Link style={{ textDecoration: "none" }} to="/register">
              Nu am cont
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
