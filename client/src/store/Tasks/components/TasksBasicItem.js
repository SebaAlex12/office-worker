import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";

class TasksBasicItem extends Component {
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
    const { removeItem } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="title">
          <TextFieldGroup
            type="text"
            title={item.title}
            onChange={this.onChangeHandler}
            name="title"
            value={item.title}
          />
        </td>
        <td className="projectName">
          {" "}
          <TextFieldGroup
            type="text"
            title={item.projectName}
            onChange={this.onChangeHandler}
            name="projectName"
            value={item.projectName}
          />
        </td>
        <td className="status">
          <TextFieldGroup
            type="text"
            title={item.status}
            onChange={this.onChangeHandler}
            name="status"
            value={item.status}
          />
        </td>
        <td className="priority">
          <TextFieldGroup
            type="text"
            title={item.priority}
            onChange={this.onChangeHandler}
            name="priority"
            value={item.priority}
          />
        </td>
        <td className="createdBy">
          <TextFieldGroup
            type="text"
            title={item.createdBy}
            onChange={this.onChangeHandler}
            name="createdBy"
            value={item.createdBy}
          />
        </td>
        <td className="responsiblePerson">
          <TextFieldGroup
            type="text"
            title={item.responsiblePerson}
            onChange={this.onChangeHandler}
            name="responsiblePerson"
            value={item.responsiblePerson}
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
        <td className="createdAt">
          <TextFieldGroup
            type="datetime-local"
            title={item.createdAt}
            onChange={this.onChangeHandler}
            name="createdAt"
            value={item.createdAt}
          />
        </td>
      </Aux>
    ) : (
      <Aux>
        <td className="title">{item.title}</td>
        <td className="projectName">{item.projectName}</td>
        <td className="status">{item.status}</td>
        <td className="priority">{item.priority}</td>
        <td className="createdBy">{item.createdBy}</td>
        <td className="responsiblePerson">{item.responsiblePerson}</td>
        <td className="termAt">
          {moment(new Date(item.termAt)).locale("pl").format("LLLL")}
        </td>
        <td className="createdAt">
          {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
        </td>
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            {editItem ? (
              <Button onClick={this.updateItemHandler}>
                <FontAwesomeIcon icon={faPlusSquare} />
              </Button>
            ) : (
              <Button onClick={() => this.setState({ moreItem: !moreItem })}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            )}
            <Button
              // className="edit"
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

export default TasksBasicItem;
