import React, { useState } from "react";

import { StyledIncomingMailBasicList } from "../styles/StyledIncomingMailBasicList";
import IncomingMailsBasicItem from "./IncomingMailsBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { SmallerButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IncomingMailsBasicList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const [input, setInput] = useState({
    number: "",
    deliveryDate: "",
    sender: "",
    deliveryCase: "",
    signature: "",
    description: "",
  });
  const handleInputChange = (event) => {
    const { searchItem } = props;
    searchItem(event);
    let newInput = {
      number: "",
      deliveryDate: "",
      sender: "",
      deliveryCase: "",
      signature: "",
      description: "",
    };
    if (event.target.name !== undefined) {
      console.log("event.target.name", event.target.name);
      newInput[event.target.name] = event.target.value;
    }
    setInput(newInput);
  };
  let ordinalNumber = 1;
  const list = items.map((item) => (
    <IncomingMailsBasicItem
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
    <StyledIncomingMailBasicList>
      <div className="incoming-mails-basic-list-box">
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              <th className="ordinalNumber">
                Lp.
                <div className="search-item"></div>
              </th>
              <th className="number">
                Nr wpisu{sortItemsContent("number")}
                <div className="search-item">
                  {searchItemsContent("number", "text")}
                </div>
              </th>
              <th className="deliveryDate">
                Data doręczenia{sortItemsContent("deliveryDate")}
                <div className="search-item">
                  {searchItemsContent("deliveryDate", "date")}
                </div>
              </th>
              <th className="sender">
                Nadawca{sortItemsContent("sender")}
                <div className="search-item">
                  {searchItemsContent("sender", "text")}
                </div>
              </th>
              <th className="deliveryCase">
                Sprawa{sortItemsContent("deliveryCase")}
                <div className="search-item">
                  {searchItemsContent("deliveryCase", "text")}
                </div>
              </th>
              <th className="signature">
                Sygnatura{sortItemsContent("signature")}
                <div className="search-item">
                  {searchItemsContent("signature", "text")}
                </div>
              </th>
              <th className="description">
                Opis{sortItemsContent("description")}
                <div className="search-item">
                  {searchItemsContent("description", "text")}
                </div>
              </th>
              <th className="actions">Akcje</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </StyledIncomingMailBasicList>
  );
};

export default IncomingMailsBasicList;
