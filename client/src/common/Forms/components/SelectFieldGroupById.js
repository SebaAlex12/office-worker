import React from "react";

export default function SelectFieldGroupById({
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
          value={item._id}
          selected={item._id === selectedItemId ? "selected" : null}
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
