import React, { useState } from "react";

import { StyledStageBasicList } from "../styles/StyledStageBasicList";
import StagesBasicItem from "./StagesBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { SmallerButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StagesBasicList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const [input, setInput] = useState({
    description: "",
    createdAt: "",
    termAt: "",
  });
  const handleInputChange = (event) => {
    const { searchItem } = props;
    searchItem(event);
    let newInput = {
      description: "",
      createdAt: "",
      termAt: "",
    };
    if (event.target.name !== undefined) {
      console.log("event.target.name", event.target.name);
      newInput[event.target.name] = event.target.value;
    }
    setInput(newInput);
  };
  const list = items.map((item) => (
    <StagesBasicItem
      key={item._id}
      item={item}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  ));
  const sortItemsContent = (column) => {
    return (
      <Aux>
        <i
          onClick={() => sortItems(column, "asc")}
          className="glyphicon glyphicon-sort-by-alphabet"
        ></i>
        <i
          onClick={() => sortItems(column, "desc")}
          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
        ></i>
      </Aux>
    );
  };
  const searchItemsContent = (column, type) => {
    return (
      <Aux>
        <TextFieldGroup
          title="Wyszukaj"
          type={type}
          onChange={(event) => handleInputChange(event)}
          name={column}
          value={input[column]}
          placeholder="Wyszukaj"
        />
        {input[column] != "" ? (
          <SmallerButton className="reset-button" onClick={handleInputChange}>
            <FontAwesomeIcon icon={faTimes} />
          </SmallerButton>
        ) : null}
      </Aux>
    );
  };
  return (
    <StyledStageBasicList>
      <div className="stages-basic-list-box">
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              <th className="createdAt">
                Data wpisu{sortItemsContent("createdAt")}
                <div className="search-item">
                  {searchItemsContent("createdAt", "date")}
                </div>
              </th>
              <th className="description">
                Treść wpisu{sortItemsContent("description")}
                <div className="search-item">
                  {searchItemsContent("description", "text")}
                </div>
              </th>
              <th className="termAt">
                Termin czynności{sortItemsContent("termAt")}
                <div className="search-item">
                  {searchItemsContent("termAt", "date")}
                </div>
              </th>
              <th className="actions">Akcje</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </StyledStageBasicList>
  );
};

export default StagesBasicList;
