import React from "react";

export default function TextFieldGroup({
  label,
  type,
  title,
  onChange,
  name,
  value,
  disabled,
  placeholder,
  style,
}) {
  return (
    <div className="form-group" style={style}>
      {label ? <label htmlFor="">{label}</label> : null}
      <input
        className="form-control"
        type={type}
        title={title}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
