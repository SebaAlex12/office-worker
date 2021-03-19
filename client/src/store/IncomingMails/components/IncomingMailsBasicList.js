import React, { useState } from "react";

import { StyledIncomingMailBasicList } from "../styles/StyledIncomingMailBasicList";
import IncomingMailsBasicItem from "./IncomingMailsBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import IncomingMailsToPdf from "./IncomingMailsToPdf";

import { Button, SmallerButton } from "../../../themes/basic";
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
  const [pdfItems, setPdfItems] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [showAllPdf, setAllShowPdf] = useState(false);

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
      newInput[event.target.name] = event.target.value;
    }
    setInput(newInput);
  };
  const getPdfItemHandler = (isChecked, item) => {
      let newPdfItems;

      if(isChecked){
        newPdfItems = [
          ...pdfItems,
          item
        ];
        
      }else{
        newPdfItems = pdfItems.filter(pdfItem => pdfItem != item);
      }
      setPdfItems(newPdfItems);
  } 
  let ordinalNumber = 1;
  const list = items.map((item) => (
    <IncomingMailsBasicItem
      ordinalNumber={ordinalNumber++}
      key={item._id}
      item={item}
      removeItem={removeItem}
      updateItem={updateItem}
      getPdfItemHandler={getPdfItemHandler}
    />
  ));
  const pdfItemsContent = pdfItems.length ? <IncomingMailsToPdf items={pdfItems} /> : <div>Brak zaznaczonych rekordów</div>;
  const pdfAllItemsContent = items.length ? <IncomingMailsToPdf items={items} /> : <div>Brak zaznaczonych rekordów</div>;
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
  const createPdfButton = <Button className="create-pdf-button" onClick={() => setShowPdf(true)}>
        Utwórz PDF z zaznaczonych
  </Button>;
  const createAllPdfButton = <Button className="create-pdf-button" onClick={() => setAllShowPdf(true)}>
        Utwórz PDF dla wszystkich
  </Button>;
  return (
    <StyledIncomingMailBasicList>
      <div className="incoming-mails-basic-list-box">
        { createPdfButton } { createAllPdfButton }
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              {/* <th className="ordinalNumber">
                Lp.
                <div className="search-item"></div>
              </th> */}
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
        { createPdfButton } { createAllPdfButton }
      </div>
      { 
      showPdf && <ModalDialog 
          width="1330px"
          showModal={() => setShowPdf(false)}
      >
          { pdfItemsContent }
        </ModalDialog>
      }
      { 
      showAllPdf && <ModalDialog 
          width="1330px"
          showModal={() => setAllShowPdf(false)}
      >
          { pdfAllItemsContent }
        </ModalDialog>
      }
    </StyledIncomingMailBasicList>
  );
};

export default IncomingMailsBasicList;
