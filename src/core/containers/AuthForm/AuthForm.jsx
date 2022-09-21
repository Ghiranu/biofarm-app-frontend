import React, { useState } from "react";
import { Formik, Form } from "formik";
import { RegisterForm } from "../../components";
import "./AuthForm.scss";

const AuthForm = (props) => {
  const { type } = props;

  const onSubmitRegister = (values) => {
    const { firstName, lastName, username, password, address, email } = values;

    return fetch("http://localhost:8080/api/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        address,
        email,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const onSubmitLogin = (values) => {
    const { username, password } = values;
    return fetch("http://localhost:8080/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-container">
      <RegisterForm
        type={type}
        onSubmitLogin={onSubmitLogin}
        onSubmitRegister={onSubmitRegister}
      />
    </div>
  );
};

export default AuthForm;
