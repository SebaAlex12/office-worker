import React from "react";

import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPencilAlt,
  faMinusSquare,
  // faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

const ProjectsToggleEditItem = ({
  items,
  clazz,
  addItem,
  removeItem,
  updateItem,
  onChangeInputUpdateItem,
  onChangeInputItem,
  onChangeInputNameItem,
  itemValue,
}) => {
  return (
    <div className={clazz}>
      {items.map((item) => (
        <Aux key={item.id}>
          <div className="desc">
            <div>
              <TextFieldGroup
                type="text"
                onChange={(event) => onChangeInputUpdateItem(event, item.id)}
                value={item.name}
              />
            </div>
            <div className="actions">
              <Button className="edit" onClick={updateItem}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
              <WarningButton
                className="remove"
                onClick={() => removeItem(item.id)}
              >
                <FontAwesomeIcon icon={faMinusSquare} />
              </WarningButton>
            </div>
          </div>
        </Aux>
      ))}
      <div className="addons">
        <div
          className="add-form"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <TextFieldGroup
            type="text"
            title="Wpisz wartość"
            onChange={onChangeInputItem}
            name={onChangeInputNameItem}
            value={itemValue}
            placeholder="wpisz wartość"
          />
          <Button className="add" onClick={addItem}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsToggleEditItem;
