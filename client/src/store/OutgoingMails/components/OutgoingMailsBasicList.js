import React, { useState } from "react";

import { StyledOutgoingMailBasicList } from "../styles/StyledOutgoingMailBasicList";
import OutgoingMailsBasicItem from "./OutgoingMailsBasicItem";
import Aux from "../../../hoc/Auxiliary";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import OutgoingMailsToPdf from "./OutgoingMailsToPdf";

import { Button, SmallerButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OutgoingMailsBasicList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const [input, setInput] = useState({
    date: "",
    number: "",
    recipient: "",
    city: "",
    zipcode: "",
    street: "",
    description: "",
    comment: "",
    collectionAmount: "",
    collectionAmountGr1: "",
    weight: "",
    g: "",
    transmittingNumber: "",
    declaredAmount: "",
    declaredAmountGr2: "",
    payment: "",
    paymentGr3: "",
  });

  const [pdfItems, setPdfItems] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [showAllPdf, setAllShowPdf] = useState(false);

  const handleInputChange = (event) => {
    const { searchItem } = props;
    searchItem(event);
    let newInput = {
      date: "",
      number: "",
      recipient: "",
      city: "",
      zipcode: "",
      street: "",
      description: "",
      comment: "",
      collectionAmount: "",
      collectionAmountGr1: "",
      weight: "",
      g: "",
      transmittingNumber: "",
      declaredAmount: "",
      declaredAmountGr2: "",
      payment: "",
      paymentGr3: "",
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
    <OutgoingMailsBasicItem
      ordinalNumber={ordinalNumber++}
      key={item._id}
      item={item}
      removeItem={removeItem}
      updateItem={updateItem}
      getPdfItemHandler={getPdfItemHandler}
    />
  ));
  const pdfItemsContent = pdfItems.length ? <OutgoingMailsToPdf items={pdfItems} /> : <div>Brak zaznaczonych rekordów</div>;
  const pdfAllItemsContent = items.length ? <OutgoingMailsToPdf items={items} /> : <div>Brak zaznaczonych rekordów</div>;
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
    <StyledOutgoingMailBasicList>
      <div className="outgoing-mails-basic-list-box">
        { createPdfButton } { createAllPdfButton }
        <table className="table table-striped">
          <thead>
            <tr scope="col">
              <th className="number">
                <div className="th-sort">{sortItemsContent("number")}</div>
                <div className="th-name">Nr wpisu</div>
                <div className="search-item">
                  {searchItemsContent("number", "text")}
                </div>
              </th>
              <th className="date">
                <div className="th-sort">{sortItemsContent("date")}</div>
                <div className="th-name">Data wpisu</div>
                <div className="search-item">
                  {searchItemsContent("date", "date")}
                </div>
              </th>
              <th className="recipient">
                <div className="th-sort">{sortItemsContent("recipient")}</div>
                <div className="th-name">Adresat</div>
                <div className="search-item">
                  {searchItemsContent("recipient", "text")}
                </div>
              </th>
              <th className="city">
                <div className="th-sort">{sortItemsContent("city")}</div>
                <div className="th-name">Miasto</div>
                <div className="search-item">
                  {searchItemsContent("city", "text")}
                </div>
              </th>
              <th className="zipcode">
                <div className="th-sort">{sortItemsContent("zipcode")}</div>
                <div className="th-name">Kod</div>
                <div className="search-item">
                  {searchItemsContent("zipcode", "text")}
                </div>
              </th>
              <th className="street">
                <div className="th-sort">{sortItemsContent("street")}</div>
                <div className="th-name">Ulica</div>
                <div className="search-item">
                  {searchItemsContent("street", "text")}
                </div>
              </th>
              <th className="collectionAmount">
                <div className="th-sort">{sortItemsContent("collectionAmount")}</div>
                <div className="th-name">Kwota zadekl.</div>
                <div className="search-item">
                  {searchItemsContent("collectionAmount", "text")}
                </div>
              </th>
              <th className="collectionAmountGr1">
                <div className="th-sort">{sortItemsContent("collectionAmountGr1")}</div>
                <div className="th-name">Gr 1</div>
                <div className="search-item">
                  {searchItemsContent("collectionAmountGr1", "text")}
                </div>
              </th>
              <th className="weight">
                <div className="th-sort">{sortItemsContent("weight")}</div>
                <div className="th-name">Waga</div>
                <div className="search-item">
                  {searchItemsContent("weight", "text")}
                </div>
              </th>
              <th className="g">
                <div className="th-sort">{sortItemsContent("g")}</div>
                <div className="th-name">G</div>
                <div className="search-item">
                  {searchItemsContent("g", "text")}
                </div>
              </th>
              <th className="transmittingNumber">
                <div className="th-sort">{sortItemsContent("transmittingNumber")}</div>
                <div className="th-name">Nr nadawczy</div>
                <div className="search-item">
                  {searchItemsContent("transmittingNumber", "text")}
                </div>
              </th>
              <th className="declaredAmount">
                <div className="th-sort">{sortItemsContent("declaredAmount")}</div>
                <div className="th-name">Opłata</div>
                <div className="search-item">
                  {searchItemsContent("declaredAmount", "text")}
                </div>
              </th>
              <th className="declaredAmountGr2">
                <div className="th-sort">{sortItemsContent("declaredAmountGr2")}</div>
                <div className="th-name">Gr 2</div>
                <div className="search-item">
                  {searchItemsContent("declaredAmountGr2", "text")}
                </div>
              </th>
              <th className="payment">
                <div className="th-sort">{sortItemsContent("payment")}</div>
                <div className="th-name">Kwota pobraniowa</div>
                <div className="search-item">
                  {searchItemsContent("payment", "text")}
                </div>
              </th>
              <th className="paymentGr3">
                <div className="th-sort">{sortItemsContent("paymentGr3")}</div>
                <div className="th-name">Gr 3</div>
                <div className="search-item">
                  {searchItemsContent("paymentGr3", "text")}
                </div>
              </th>
              {/* <th className="description">
                <div className="th-sort">{sortItemsContent("description")}</div>
                <div className="th-name">Opis</div>
                <div className="search-item">
                  {searchItemsContent("description", "text")}
                </div>
              </th>
              <th className="comment">
                <div className="th-sort">{sortItemsContent("comment")}</div>
                <div className="th-name">Komentarz</div>
                <div className="search-item">
                  {searchItemsContent("comment", "text")}
                </div>
              </th> */}
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
    </StyledOutgoingMailBasicList>
  );
};

export default OutgoingMailsBasicList;
