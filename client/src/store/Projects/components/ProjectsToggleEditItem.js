import React, { useState } from "react";

import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPencilAlt,
  faMinusSquare,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

const ProjectsToggleEditItem = ({
  items,
  title,
  clazz,
  addItem,
  removeItem,
  editItem,
}) => {
  const [toggleAddForm, setToggleAddForm] = useState(false);
  return (
    <div className={clazz}>
      <span>{title}</span>
      {items.map((item) => (
        <Aux key={item.id}>
          <span>{item.name}</span>
          <WarningButton className="remove" onClick={removeItem}>
            <FontAwesomeIcon icon={faMinusSquare} />
          </WarningButton>
        </Aux>
      ))}
      <div className="actions" style={{ float: "right" }}>
        <Button className="edit" onClick={editItem}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
        <Button
          className="toggle-add"
          onClick={() => setToggleAddForm(!toggleAddForm)}
        >
          <FontAwesomeIcon icon={faCaretSquareDown} />
        </Button>
      </div>
      {toggleAddForm ? (
        <div
          className="add-form"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <TextFieldGroup />
          <Button className="add" onClick={addItem}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectsToggleEditItem;
