"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string;
  loading?: boolean;
  type?: "submit" | "reset" | "button";
  classes?: string;
}
const SubmitButton: React.FC<ButtonProps> = ({
  children,
  loading,
  type = "submit",
  classes,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`btn btn--dashboard [disabled]:cursor-none ${
        classes ? classes : "btn--primary "
      }${loading ? " flex items-center " : ""}`}
    >
      <span className={`${loading ? "me-2" : ""}`}>{children}</span>
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
      )}
    </button>
  );
};

export default SubmitButton;
