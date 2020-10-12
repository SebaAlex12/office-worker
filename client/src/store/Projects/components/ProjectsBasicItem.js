import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import ProjectsDetailsContainer from "./details/ProjectsDetailsContainer";

class ProjectsBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: item,
      showItemDetails: false,
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
    const { item, editItem, moreItem, showItemDetails } = this.state;
    const { removeItem } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="name">
          <TextFieldGroup
            type="text"
            title={item.name}
            onChange={this.onChangeHandler}
            name="name"
            value={item.name}
          />
        </td>
        <td className="createdAt">
          {" "}
          <TextFieldGroup
            type="datetime-local"
            title={item.createdAt}
            onChange={this.onChangeHandler}
            name="createdAt"
            value={item.createdAt}
            disabled="true"
          />
        </td>
        <td className="type">
          <TextFieldGroup
            type="text"
            title={item.type}
            onChange={this.onChangeHandler}
            name="type"
            value={item.type}
            disabled="true"
          />
        </td>
        <td className="signature">
          <TextFieldGroup
            type="text"
            title={item.signature}
            onChange={this.onChangeHandler}
            name="signature"
            value={item.signature}
            disabled="true"
          />
        </td>
        <td className="lastComment">
          <TextFieldGroup
            type="text"
            title={item.lastComment}
            onChange={this.onChangeHandler}
            name="lastComment"
            value={item.lastComment}
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
        <td className="name">{item.name}</td>
        <td className="createdAt">
          {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
        </td>
        <td className="type">{item.type}</td>
        <td className="signature">{item.signature}</td>
        <td className="lastComment">{item.lastComment}</td>
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
            <Button
              className="show-item-details"
              onClick={() =>
                this.setState({ showItemDetails: !showItemDetails })
              }
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </Button>
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
        {showItemDetails ? (
          <ModalDialog
            width="1200px"
            showModal={() => this.setState({ showItemDetails: false })}
          >
            <ProjectsDetailsContainer item={item} />
          </ModalDialog>
        ) : null}
      </Aux>
    );
  }
}

export default ProjectsBasicItem;
