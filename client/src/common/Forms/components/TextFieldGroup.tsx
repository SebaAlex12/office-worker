import React from "react";

interface Iprops{
  label: string | undefined,
  type: string | undefined,
  title: string | undefined,
  onChange(data:any):any,
  name: string | undefined,
  value: any,
  disabled: boolean | undefined,
  placeholder: string | undefined,
  style: React.CSSProperties | undefined
}

export default function TextFieldGroup(props:any) {
  const {
    label,
    type,
    title,
    onChange,
    name,
    value,
    disabled,
    placeholder,
    style,
  } = props;
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
