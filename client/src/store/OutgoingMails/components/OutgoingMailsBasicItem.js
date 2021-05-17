import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import DateTimeFormat from "../../../common/DateTimeFormat";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton, CheckboxStyle } from "../../../themes/basic";

class OutgoingMailsBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: item,
    };
  }
  onChangeHandler = (event) => {
    const { item } = this.state;
    const newItem = {
      ...item,
      [event.target.name]: event.target.value,
    };
    this.setState({
      item: newItem,
    });
  };
  updateItemHandler = async () => {
    const { updateItem } = this.props;
    const { item } = this.state;
    // if (editItem) {
    const response = await updateItem(item);
    //   if (response) {
    this.setState({ editItem: false });
    //   }
    // }
  };

  render() {
    const { item, editItem, moreItem } = this.state;
    const { removeItem, getPdfItemHandler } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="number">
          <TextFieldGroup
            type="text"
            title={item.number}
            onChange={this.onChangeHandler}
            name="number"
            value={item.number}
          />
        </td>
        <td className="date">
          {" "}
          <TextFieldGroup
            type="datetime-local"
            title={item.date}
            onChange={this.onChangeHandler}
            name="date"
            value={item.date}
          />
        </td>
        <td className="recipient">
          <TextFieldGroup
            recipient="text"
            title={item.recipient}
            onChange={this.onChangeHandler}
            name="recipient"
            value={item.recipient}
          />
        </td>
        <td className="city">
          <TextFieldGroup
            type="text"
            title={item.city}
            onChange={this.onChangeHandler}
            name="city"
            value={item.city}
          />
        </td>
        <td className="zipcode">
          <TextFieldGroup
            type="text"
            title={item.zipcode}
            onChange={this.onChangeHandler}
            name="zipcode"
            value={item.zipcode}
          />
        </td>

        <td className="street">
          <TextFieldGroup
            type="text"
            title={item.street}
            onChange={this.onChangeHandler}
            name="street"
            value={item.street}
          />
        </td>
        <td className="collectionAmount">
          <TextFieldGroup
            type="text"
            title={item.collectionAmount}
            onChange={this.onChangeHandler}
            name="collectionAmount"
            value={item.collectionAmount}
          />
        </td>
        <td className="collectionAmountGr1">
          <TextFieldGroup
            type="text"
            title={item.collectionAmountGr1}
            onChange={this.onChangeHandler}
            name="collectionAmountGr1"
            value={item.collectionAmountGr1}
          />
        </td>
        <td className="weight">
          <TextFieldGroup
            type="text"
            title={item.weight}
            onChange={this.onChangeHandler}
            name="weight"
            value={item.weight}
          />
        </td>
        <td className="g">
          <TextFieldGroup
            type="text"
            title={item.g}
            onChange={this.onChangeHandler}
            name="g"
            value={item.g}
          />
        </td>
        <td className="transmittingNumber">
          <TextFieldGroup
            type="text"
            title={item.transmittingNumber}
            onChange={this.onChangeHandler}
            name="transmittingNumber"
            value={item.transmittingNumber}
          />
        </td>
        <td className="declaredAmount">
          <TextFieldGroup
            type="text"
            title={item.declaredAmount}
            onChange={this.onChangeHandler}
            name="declaredAmount"
            value={item.declaredAmount}
          />
        </td>
        <td className="declaredAmountGr2">
          <TextFieldGroup
            type="text"
            title={item.declaredAmountGr2}
            onChange={this.onChangeHandler}
            name="declaredAmountGr2"
            value={item.declaredAmountGr2}
          />
        </td>
        <td className="payment">
          <TextFieldGroup
            type="text"
            title={item.payment}
            onChange={this.onChangeHandler}
            name="payment"
            value={item.payment}
          />
        </td>
        <td className="paymentGr3">
          <TextFieldGroup
            type="text"
            title={item.paymentGr3}
            onChange={this.onChangeHandler}
            name="paymentGr3"
            value={item.paymentGr3}
          />
        </td>
        <td className="description">
          <TextFieldGroup
            type="text"
            title={item.description}
            onChange={this.onChangeHandler}
            name="description"
            value={item.description}
          />
        </td>
        <td className="comment">
          <TextFieldGroup
            type="text"
            title={item.comment}
            onChange={this.onChangeHandler}
            name="comment"
            value={item.comment}
          />
        </td>
      </Aux>
    ) : (
      <Aux>
        {/* <td className="ordinalNumber">{ordinalNumber}</td> */}
        <td className="number">
          <CheckboxStyle>
              <input 
                type="checkbox" 
                name="pdf" 
                value={item.pdf} 
                onChange={(event) => getPdfItemHandler(event.target.checked, item)}
                defaultChecked={false}
              />
            </CheckboxStyle>
            {item.number}
        </td>
        <td className="date">
          <DateTimeFormat date={item.date} short={true} />
        </td>
        <td className="recipient">{item.recipient}</td>
        <td className="city">{item.city}</td>
        <td className="zipcode">{item.zipcode}</td>
        <td className="street">{item.street}</td>
        <td className="collectionAmount">{item.collectionAmount}</td>
        <td className="collectionAmountGr1">{item.collectionAmountGr1}</td>
        <td className="weight">{item.weight}</td>
        <td className="g">{item.g}</td>
        <td className="transmittingNumber">{item.transmittingNumber}</td>
        <td className="declaredAmount">{item.declaredAmount}</td>
        <td className="declaredAmountGr2">{item.declaredAmountGr2}</td>
        <td className="payment">{item.payment}</td>
        <td className="paymentGr3">{item.paymentGr3}</td>
        {/* <td className="description">{item.description}</td>
        <td className="comment">{item.comment}</td> */}
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            {editItem ? (
              <Button title="Zapisz rekord" onClick={this.updateItemHandler}>
                <FontAwesomeIcon icon={faPlusSquare} />
              </Button>
            ) : (
              <Button
                title="Rozwiń rekord"
                onClick={() => this.setState({ moreItem: !moreItem })}
                disabled={true}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            )}
            {editItem ? (
              <Button
                title="Zapisz rekord"
                onClick={this.updateItemHandler}
                className="active"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            ) : (
              <Button
                title="edytuj rekord"
                onClick={() => this.setState({ editItem: !editItem })}
                title="edytuj rekord"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            )}
            <WarningButton
              title="Usuń rekord"
              onClick={() => removeItem(item._id)}
              className="remove"
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </WarningButton>
          </td>
        </tr>
        {moreItem ? (
          <tr>
            <td colSpan="2">
              <div className="catalog-item-desc-box">
                <TextareaFieldGroup
                  onChange={this.onChangeHandler}
                  name="description"
                  cols="10"
                  rows="5"
                  value={item.description}
                  placeholder="Dodaj notatkę"
                />
                <Button onClick={this.updateItemHandler}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </div>
            </td>
            <td colSpan="5"></td>
          </tr>
        ) : null}
      </Aux>
    );
  }
}

export default OutgoingMailsBasicItem;
