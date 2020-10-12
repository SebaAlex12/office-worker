import React, { useState } from "react";

import { StyledProjectBasicList } from "../styles/StyledProjectBasicList";
import ProjectsBasicItem from "./ProjectsBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { SmallerButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectsBasicList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const [input, setInput] = useState({
    name: "",
    createdAt: "",
    type: "",
    signature: "",
    lastComments: "",
    termAt: "",
  });
  const handleInputChange = (event) => {
    const { searchItem } = props;
    searchItem(event);
    let newInput = {
      name: "",
      createdAt: "",
      type: "",
      signature: "",
      lastComments: "",
      termAt: "",
    };
    if (event.target.name !== undefined) {
      console.log("event.target.name", event.target.name);
      newInput[event.target.name] = event.target.value;
    }
    setInput(newInput);
  };
  const list = items.map((item) => (
    <ProjectsBasicItem
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
    <StyledProjectBasicList>
      <div className="projects-basic-list-box">
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              <th className="name">
                Nazwa{sortItemsContent("name")}
                <div className="search-item">
                  {searchItemsContent("name", "text")}
                </div>
              </th>
              <th className="createdAt">
                Data rejestracji{sortItemsContent("createdAt")}
                <div className="search-item">
                  {searchItemsContent("createdAt", "datetime-local")}
                </div>
              </th>
              <th className="type">
                Rodzaj rozprawy{sortItemsContent("type")}
                <div className="search-item">
                  {searchItemsContent("type", "text")}
                </div>
              </th>
              <th className="signature">
                Sygnatura{sortItemsContent("signature")}
                <div className="search-item">
                  {searchItemsContent("signature", "text")}
                </div>
              </th>
              <th className="lastComments">
                Ostatni komentarz{sortItemsContent("lastComments")}
                <div className="search-item">
                  {searchItemsContent("lastComments", "text")}
                </div>
              </th>
              <th className="termAt">
                Termin{sortItemsContent("termAt")}
                <div className="search-item">
                  {searchItemsContent("termAt", "datetime-local")}
                </div>
              </th>
              <th className="actions">Akcje</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </StyledProjectBasicList>
  );
};

export default ProjectsBasicList;
