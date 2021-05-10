import React from "react";

const TextareaFieldGroup = (props:any) => {
  const {
    title,
    onChange,
    name,
    value,
    cols,
    rows,
    disabled,
    placeholder,
  } = props;
  return (
    <div className="form-group">
      <textarea
        className="form-control"
        title={title}
        onChange={onChange}
        name={name}
        cols={cols}
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      >
        {value}
      </textarea>
    </div>
  );
};

export default TextareaFieldGroup;
