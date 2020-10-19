import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";

class StagesBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
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
    const { item, editItem } = this.state;
    const { removeItem, ordinalNumber } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="createdAt">
          {" "}
          <TextFieldGroup
            type="datetime-local"
            title={item.createdAt}
            onChange={this.onChangeHandler}
            name="createdAt"
            value={item.createdAt}
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
        <td className="termAt">
          <TextFieldGroup
            type="datetime-local"
            title={item.termAt}
            onChange={this.onChangeHandler}
            name="termAt"
            value={item.termAt}
          />
        </td>
      </Aux>
    ) : (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="createdAt">
          {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
        </td>
        <td className="description">{item.description}</td>
        <td className="termAt">
          {moment(new Date(item.termAt)).locale("pl").format("LLLL")}
        </td>
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            <Button onClick={this.updateItemHandler}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            <Button
              onClick={() => this.setState({ editItem: !editItem })}
              title="edytuj rekord"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <WarningButton
              onClick={() => removeItem(item._id)}
              className="remove"
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </WarningButton>
          </td>
        </tr>
      </Aux>
    );
  }
}

export default StagesBasicItem;
