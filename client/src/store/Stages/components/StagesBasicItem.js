import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

import DateTimeFormat from "../../../common/DateTimeFormat";
import { addTask } from "../../Tasks/actions";
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
  addTaskHandler = () => {
    const { item } = this.state;
    const { addTask, loggedUser } = this.props;

    const data = {
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      projectId: item.projectId,
      // projectName,
      responsiblePerson: loggedUser.name,
      title: item.description,
      description: item.description,
      // responsiblePersonLastComment,
      priority: "Normalny",
      status: "Do wykonania",
      termAt: item.termAt,
    };

    const response = addTask(data);
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
        <td className="createdBy">
          <TextFieldGroup
            type="text"
            title={item.createdBy}
            onChange={this.onChangeHandler}
            name="createdBy"
            value={item.createdBy}
            disabled={true}
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
          <DateTimeFormat date={item.createdAt} short={true} />
        </td>
        <td className="description">{item.description}</td>
        <td className="createdBy">{item.createdBy}</td>
        <td className="termAt">
          <DateTimeFormat date={item.termAt} short={true} />
        </td>
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            <Button onClick={this.addTaskHandler} title="Dodaj etap do zadania">
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            {editItem ? (
              <Button
                onClick={this.updateItemHandler}
                title="zapisz etap"
                className="active"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            ) : (
              <Button
                onClick={() => this.setState({ editItem: !editItem })}
                title="edytuj etap"
                disabled={true}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            )}

            <WarningButton
              onClick={() => removeItem(item._id)}
              className="remove"
              title="Usuń etap z listy"
              disabled={true}
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </WarningButton>
          </td>
        </tr>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, { addTask })(StagesBasicItem);
