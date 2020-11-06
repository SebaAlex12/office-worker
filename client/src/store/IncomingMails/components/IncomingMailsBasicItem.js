import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";

import DateTimeFormat from "../../../common/DateTimeFormat";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";

class IncomingMailsBasicItem extends Component {
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
    const { removeItem, ordinalNumber } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="number">
          <TextFieldGroup
            type="text"
            title={item.number}
            onChange={this.onChangeHandler}
            name="number"
            value={item.number}
          />
        </td>
        <td className="deliveryDate">
          {" "}
          <TextFieldGroup
            type="datetime-local"
            title={item.deliveryDate}
            onChange={this.onChangeHandler}
            name="deliveryDate"
            value={item.deliveryDate}
          />
        </td>
        <td className="sender">
          <TextFieldGroup
            sender="text"
            title={item.sender}
            onChange={this.onChangeHandler}
            name="sender"
            value={item.sender}
          />
        </td>
        <td className="deliveryCase">
          <TextFieldGroup
            type="text"
            title={item.deliveryCase}
            onChange={this.onChangeHandler}
            name="deliveryCase"
            value={item.deliveryCase}
          />
        </td>
        <td className="signature">
          <TextFieldGroup
            type="text"
            title={item.signature}
            onChange={this.onChangeHandler}
            name="signature"
            value={item.signature}
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
      </Aux>
    ) : (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="number">{item.number}</td>
        <td className="deliveryDate">
          <DateTimeFormat date={item.deliveryDate} short={true} />
        </td>
        <td className="sender">{item.sender}</td>
        <td className="deliveryCase">{item.deliveryCase}</td>
        <td className="signature">{item.signature}</td>
        <td className="description">{item.description}</td>
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
            <Button
              // className="edit"
              onClick={() => this.setState({ editItem: !editItem })}
              title="Edytuj rekord"
              disabled={true}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
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

export default IncomingMailsBasicItem;
