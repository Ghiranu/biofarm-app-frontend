import { Button, Container, FormControl, TextField } from "@mui/material";
import React from "react";
import "./RegisterForm.scss";
import Register from "../../../assets/images/Register.svg";
import { ErrorMessage, Field, Form, Formik, useField, useFormik } from "formik";
import * as Yup from "yup";
import { CustomInputField } from "../../../shared";
import { useLocation } from "react-router-dom";
import {
  Person,
  Lock,
  AccountBox,
  Email,
  Home,
  ChevronRight,
} from "@mui/icons-material";

const RegisterForm = (props) => {
  const { onSubmitRegister, onSubmitLogin, type } = props;

  const location = useLocation();

  const onAuthAction = location.pathname.includes("register")
    ? onSubmitRegister
    : onSubmitLogin;

  const initialValues = location.pathname.includes("register")
    ? {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        address: "",
      }
    : {
        username: "",
        password: "",
      };

  const validationSchema = location.pathname.includes("register")
    ? Yup.object({
        username: Yup.string()
          .min(3, "Must be at least 3 characters.")
          .required("Username can't be less than 3 characters."),
        password: Yup.string()
          .min(5, "Must be at least 5 characters.")
          .required("Password can't be less than 5 characters"),
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Must be 15 characters or less"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Must be 20 characters or less"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Invalid email address"),
        address: Yup.string().required("Address can't be empty!"),
      })
    : Yup.object({
        username: Yup.string()
          .min(3, "Must be at least 3 characters.")
          .required("Invalid username."),
        password: Yup.string()
          .min(5, "Must be at least 5 characters.")
          .required("Invalid password."),
      });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onAuthAction(values);
        // TODO : Prevent form reset if backend call fails.
        resetForm(initialValues);
      }}
    >
      {location.pathname.includes("register") ? (
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <Form className="register">
                <div className="register__field">
                  <CustomInputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="login__input"
                    icon={<Person className="login__icon" />}
                  />
                </div>
                <div className="register__field">
                  <CustomInputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="login__input"
                    icon={<Lock className="login__icon" />}
                  />
                </div>
                <div className="register__field">
                  <CustomInputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="login__input"
                    icon={<AccountBox className="login__icon" />}
                  />
                </div>
                <div className="register__field">
                  <CustomInputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="login__input"
                    icon={<AccountBox className="login__icon" />}
                  />
                </div>
                <div className="register__field">
                  <CustomInputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your e-mail"
                    className="login__input"
                    icon={<Email className="login__icon" />}
                  />
                </div>
                <div className="register__field">
                  <CustomInputField
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    className="login__input"
                    icon={<Home className="login__icon" />}
                  />
                </div>
                <button type="submit" className="button login__submit">
                  <span className="button__text">Register</span>
                  <ChevronRight className="button__icon fas fa-chevron-right" />
                </button>
              </Form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <Form className="login">
                <div className="login__field">
                  <CustomInputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="login__input"
                    icon={<Person className="login__icon" />}
                  />
                </div>
                <div className="login__field">
                  <CustomInputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="login__input"
                    icon={<Lock className="login__icon" />}
                  />
                </div>
                <button type="submit" className="button login__submit">
                  <span className="button__text">Log In</span>
                  <ChevronRight className="button__icon fas fa-chevron-right" />
                </button>
              </Form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
