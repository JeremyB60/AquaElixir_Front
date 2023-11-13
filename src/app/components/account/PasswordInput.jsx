import React, { useState } from "react";
import { Field } from "formik";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Space") {
  //     togglePasswordVisibility();
  //   }
  // };
  // const handleMouseDown = () => {
  //   setShowPassword(true);
  // };

  // const handleMouseUp = () => {
  //   setShowPassword(false);
  // };

  return (
    <div className="relative mt-5">
      <label htmlFor="password">Mot de passe</label>
      <Field
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Mot de passe"
        autoComplete="current-password"
        className="input mt-2"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="passwordIcon absolute"
        onClick={togglePasswordVisibility}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        <g clipPath="url(#clip0_73_524)">
          <path
            d="M21 9C18.6 11.667 15.6 13 12 13C8.4 13 5.4 11.667 3 9"
            stroke="#ccc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15L5.5 11.2"
            stroke="#aaa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 14.976L18.508 11.2"
            stroke="#aaa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 17L9.5 13"
            stroke="#aaa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 17L14.5 13"
            stroke="#aaa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_73_524">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default PasswordInput;
