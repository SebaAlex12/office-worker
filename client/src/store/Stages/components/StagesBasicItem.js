import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import SelectFieldGroupById from "../../../common/Forms/components/SelectFieldGroupById";
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
      moreItem: false,
      item: item,
      calendarUserId: "",
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
  onChangeCalendarUserId = (event) => {
    // console.log("event", event.target.name, event.target.value);
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };
  updateItemHandler = async () => {
    const { updateItem, stages } = this.props;
    const { item } = this.state;

    let isLastCreateDate = true;

    stages.forEach(element => {
      if(element.createdAt > item.createdAt){
        isLastCreateDate = false;
      }
    });

    // if (editItem) {
    const response = await updateItem(item,isLastCreateDate);
    //   if (response) {
    this.setState({ editItem: false });
    //   }
    // }
  };
  addTaskHandler = () => {
    const { item, calendarUserId } = this.state;
    const { addTask, loggedUser } = this.props;

    // console.log("state", this.state);
    const data = {
      projectId: item.projectId,
      createdByUserId: loggedUser._id,
      responsiblePersonId: calendarUserId,
      title: item.description,
      status: "Do wykonania",
      priority: "Normalny",
      description: item.description,
      // responsiblePersonLastComment,
      termAt: item.termAt,
    };

    const response = addTask(data);
    if (response) {
      this.setState({
        ...this.state,
        moreItem: false,
      });
    }
  };
  render() {
    const { item, editItem, moreItem, calendarUserId } = this.state;
    const { removeItem, ordinalNumber } = this.props;

    const users = this.props.users.filter(
      (user) => user.status === "Administrator" || user.status === "Menedżer"
    );

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
            <Button
              onClick={() =>
                this.setState({ ...this.state, moreItem: !moreItem })
              }
              title="Pokaż użytkownika do przypisania zadania"
            >
              <FontAwesomeIcon icon={faEdit} />
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
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            )}

            <WarningButton
              onClick={() => removeItem(item._id)}
              className="remove"
              title="Usuń etap z listy"
              // disabled={true}
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </WarningButton>
          </td>
        </tr>
        {moreItem ? (
          <tr>
            <td colSpan="4"></td>
            <td colSpan="2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "baseline",
                }}
              >
                <SelectFieldGroupById
                  defaultName="Wybierz dla kogo utworzyć zadanie"
                  name="calendarUserId"
                  items={users}
                  selectedItemId={calendarUserId}
                  onChange={(event) => this.onChangeCalendarUserId(event)}
                />
                <Button onClick={this.addTaskHandler}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    title="Dodaj etap do zadania"
                  />
                </Button>
              </div>
            </td>
          </tr>
        ) : null}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    users: state.users.users,
    stages: state.stages.stages
  };
};

export default connect(mapStateToProps, { addTask })(StagesBasicItem);
