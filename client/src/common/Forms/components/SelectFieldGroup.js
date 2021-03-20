import React from "react";
import Styled from "styled-components";

export default function SelectFieldGroup({
  defaultName,
  label,
  name,
  items,
  selectedItemName,
  onChange,
  disabled,
}) {
  let counter = 1;
  const selectOptionsContent = items
    ? items.map((item) => (
        <option
          key={counter++}
          value={item.name}
          // selected={item.name === selectedItemName ? "selected" : null}
        >
          {item.name}
        </option>
      ))
    : null;
  return (
    <SelectFieldGroupStyles>
        <div className="form-group">
          { label && (
            <label htmlFor="" className="form-label">{ label }</label>
          )}
          <select
            name={name}
            id=""
            className="form-control"
            onChange={onChange}
            disabled={disabled ? "disabled" : null}
            defaultValue={selectedItemName}
          >
            {defaultName ? <option>{defaultName}</option> : null}
            {selectOptionsContent}
          </select>
        </div>
    </SelectFieldGroupStyles>
  );
}

const SelectFieldGroupStyles = Styled.div`
    .form-group{
      text-align:left;
    }
`;