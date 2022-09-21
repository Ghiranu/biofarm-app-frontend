import { useField } from "formik";
import React from "react";

const CustomInputField = ({ label, icon, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <div className="d-flex align-items-center">
        {icon}
        <input className="text-input" {...field} {...props} />
      </div>
      {meta.error ? <div style={{ color: "red" }}>{meta.error}</div> : null}
    </>
  );
};

export default CustomInputField;
