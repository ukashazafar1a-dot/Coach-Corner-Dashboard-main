import React, { useState } from "react";
import IconEye from "@/components/icons/IconEye"; // Adjust path if necessary
import IconEyeClose from "@/components/icons/IconEyeClose";

type PasswordFieldProps = {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const PasswordField = ({
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
}: PasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleEye = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="password-field relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="on"
        className="input--field"
        placeholder={placeholder}
      />
      <span className="absolute top-1 right-1 flex items-center justify-center z-1 " onClick={toggleEye}>
        {isPasswordVisible ? <IconEye /> : <IconEyeClose />}
      </span>
    </div>
  );
};

export default PasswordField;
