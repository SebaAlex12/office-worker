import React, { useState } from "react";

import { StyledTaskBasicList } from "../styles/StyledTaskBasicList";
import TasksBasicItem from "./TasksBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { SmallerButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TasksBasicList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const [input, setInput] = useState({
    title: "",
    projectName: "",
    status: "",
    priority: "",
    createdBy: "",
    responsiblePerson: "",
    termAt: "",
    createdAt: "",
  });
  const handleInputChange = (event) => {
    const { searchItem } = props;
    searchItem(event);
    let newInput = {
      title: "",
      projectName: "",
      status: "",
      priority: "",
      createdBy: "",
      responsiblePerson: "",
      termAt: "",
      createdAt: "",
    };
    if (event.target.name !== undefined) {
      console.log("event.target.name", event.target.name);
      newInput[event.target.name] = event.target.value;
    }
    setInput(newInput);
  };
  let ordinalNumber = 1;
  const list = items.map((item) => (
    <TasksBasicItem
      ordinalNumber={ordinalNumber++}
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
    <StyledTaskBasicList>
      <div className="tasks-basic-list-box">
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              <th className="ordinalNumber">
                Lp.
                <div className="search-item"></div>
              </th>
              <th className="title">
                Tytuł{sortItemsContent("title")}
                <div className="search-item">
                  {searchItemsContent("title", "text")}
                </div>
              </th>
              <th className="projectName">
                Nazwa sprawy{sortItemsContent("projectName")}
                <div className="search-item">
                  {searchItemsContent("projectName", "text")}
                </div>
              </th>
              <th className="status">
                Stan {sortItemsContent("status")}
                <div className="search-item">
                  {searchItemsContent("status", "text")}
                </div>
              </th>
              {/* <th className="priority">
                Priorytet{sortItemsContent("priority")}
                <div className="search-item">
                  {searchItemsContent("priority", "text")}
                </div>
              </th> */}
              <th className="createdBy">
                Zlecający{sortItemsContent("createdBy")}
                <div className="search-item">
                  {searchItemsContent("createdBy", "text")}
                </div>
              </th>
              <th className="responsiblePerson">
                Wykonawca{sortItemsContent("responsiblePerson")}
                <div className="search-item">
                  {searchItemsContent("responsiblePerson", "text")}
                </div>
              </th>
              <th className="termAt">
                Termin{sortItemsContent("termAt")}
                <div className="search-item">
                  {searchItemsContent("termAt", "date")}
                </div>
              </th>
              <th className="createdAt">
                Utworzono{sortItemsContent("createdAt")}
                <div className="search-item">
                  {searchItemsContent("createdAt", "date")}
                </div>
              </th>
              <th className="actions">Akcje</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </StyledTaskBasicList>
  );
};

export default TasksBasicList;
