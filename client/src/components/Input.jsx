import React from "react";

const Input = ({ placeholder, value, onChange, type }) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default Input;
