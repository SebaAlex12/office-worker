import React from "react";

export default function TextFieldGroup({
  defaultName,
  name,
  items,
  selectedItemId,
  onChange,
  disabled,
}) {
  let counter = 1;
  const selectOptionsContent = items
    ? items.map((item) => (
        <option
          key={counter++}
          value={item.name}
          selected={item.name === selectedItemId ? "selected" : null}
        >
          {item.name}
        </option>
      ))
    : null;
  return (
    <div className="form-group">
      <select
        name={name}
        id=""
        className="form-control"
        onChange={onChange}
        disabled={disabled ? "disabled" : null}
      >
        {defaultName ? <option value="">{defaultName}</option> : null}
        {selectOptionsContent}
      </select>
    </div>
  );
}
