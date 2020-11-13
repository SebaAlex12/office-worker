import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import { status_clasess } from "../../ini";
import DateTimeFormat from "../../../common/DateTimeFormat";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import { statuses } from "../../ini";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import CalendarContainer from "../../Calendar/components/CalendarContainer";
import CalendarQuickAddButton from "../../Calendar/components/CalendarQuickAddButton";

class TasksBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: item,
      showCalendar: false,
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
    if (response) {
      this.setState({ editItem: false });
    }
    // }
  };
  render() {
    const { item, editItem, moreItem, showCalendar } = this.state;
    const {
      removeItem,
      ordinalNumber,
      loggedUser,
      projects,
      users,
    } = this.props;

    // console.log("item", item);

    const selectedProject = projects
      ? projects.filter((project) => project._id === item.projectId).shift()
      : { name: "is loading..." };

    const createdByUser = users
      ? users.filter((user) => user._id === item.createdByUserId).shift()
      : { name: "is loading ..." };

    const responsibleByUser = users
      ? users.filter((user) => user._id === item.responsiblePersonId).shift()
      : { name: "is loading ..." };

    // console.log("createdByUser", createdByUser);

    const itemContent = editItem ? (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="title">
          <TextFieldGroup
            type="text"
            title={item.title}
            onChange={this.onChangeHandler}
            name="title"
            value={item.title}
            disabled="true"
          />
          <div className="quick-actions">
            <Button
              title="Wyświetl kalendarz"
              onClick={() =>
                this.setState({ ...this.state, showCalendar: true })
              }
              disabled={true}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
            <CalendarQuickAddButton
              userId={loggedUser._id}
              eventId={item._id}
              selectedDate={item.termAt}
              eventType="Zadanie"
              btnTitle="Dodaj do kalendarza"
              title="Szybkie zadanie"
              status="enabled"
              disabled={true}
            />
          </div>
        </td>
        <td className="selectedProject">
          {" "}
          <TextFieldGroup
            type="text"
            title={selectedProject.name}
            onChange={this.onChangeHandler}
            name="selectedProject"
            value={selectedProject.name}
            disabled="true"
          />
        </td>
        <td className="status">
          <SelectFieldGroup
            name="status"
            items={statuses}
            selectedItem={item.status}
            onChange={this.onChangeHandler}
          />
        </td>
        {/* <td className="priority">
          <SelectFieldGroup
            name="priority"
            items={priorities}
            selectedItem={item.priority}
            onChange={this.onChangeHandler}
          />
        </td> */}
        <td className="createdBy">
          <TextFieldGroup
            type="text"
            title={createdByUser.name}
            onChange={this.onChangeHandler}
            name="createdByUser"
            value={createdByUser.name}
            disabled="true"
          />
        </td>
        <td className="responsiblePerson">
          <TextFieldGroup
            type="text"
            title={responsibleByUser.name}
            onChange={this.onChangeHandler}
            name="responsiblePerson"
            value={responsibleByUser.name}
            disabled="true"
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
            disabled="true"
          />
        </td>
      </Aux>
    ) : (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="title">
          {item.title}
          <div className="quick-actions">
            <Button
              title="Wyświetl kalendarz"
              onClick={() =>
                this.setState({ ...this.state, showCalendar: true })
              }
              disabled={true}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
            <CalendarQuickAddButton
              userId={loggedUser._id}
              eventId={item._id}
              selectedDate={item.termAt}
              eventType="Zadanie"
              btnTitle="Dodaj do kalendarza"
              title="Szybkie zadanie"
              status="enabled"
              disabled={true}
            />
          </div>
        </td>
        <td className="selectedProject">{selectedProject.name}</td>
        <td className="status">{item.status}</td>
        {/* <td className="priority">{item.priority}</td> */}
        <td className="createdBy">{createdByUser.name}</td>
        <td className="responsiblePerson">{responsibleByUser.name}</td>
        <td className="termAt">
          <DateTimeFormat date={item.termAt} short={true} />
        </td>
        <td className="createdAt">
          <DateTimeFormat date={item.createdAt} short={true} />
        </td>
      </Aux>
    );

    const $clazz = status_clasess.filter(
      (element) => element.status_name === item.status
    );

    return (
      <Aux>
        <tr className={$clazz.length > 0 ? $clazz[0].classes_name : null}>
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
              title="edytuj rekord"
              onClick={() => this.setState({ editItem: !editItem })}
              title="edytuj rekord"
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
        {showCalendar ? (
          <ModalDialog
            width="1400px"
            showModal={() => this.setState({ showCalendar: false })}
          >
            <CalendarContainer />
          </ModalDialog>
        ) : null}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    users: state.users.users,
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps)(TasksBasicItem);
