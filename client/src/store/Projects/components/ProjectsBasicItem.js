import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
  faExpandArrowsAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";

import { projectTypes } from "../../ini";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import ProjectsDetailsContainer from "./details/ProjectsDetailsContainer";
import CalendarContainer from "../../Calendar/components/CalendarContainer";
import CalendarQuickAddButton from "../../Calendar/components/CalendarQuickAddButton";

class ProjectsBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: item,
      showItemDetails: false,
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
    //   if (response) {
    this.setState({ editItem: false });
    //   }
    // }
  };
  render() {
    const {
      item,
      editItem,
      moreItem,
      showItemDetails,
      showCalendar,
    } = this.state;
    const { removeItem, ordinalNumber, loggedUser } = this.props;

    const itemContent = editItem ? (
      <Aux>
        <td className="ordinalNumber">{ordinalNumber}</td>
        <td className="name">
          <TextFieldGroup
            type="text"
            title={item.name}
            onChange={this.onChangeHandler}
            name="name"
            value={item.name}
            disabled="true"
          />
          <div className="quick-actions">
            <Button
              title="Wyświetl kalendarz"
              onClick={() =>
                this.setState({ ...this.state, showCalendar: true })
              }
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
            <CalendarQuickAddButton
              userId={loggedUser._id}
              eventId={item._id}
              selectedDate={item.termAt}
              eventType="Projekt"
              btnTitle="Dodaj do kalendarza"
              title="Szybkie dodanie"
              status="enabled"
            />
          </div>
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
          <SelectFieldGroup
            name="type"
            items={projectTypes}
            selectedItem={item.type}
            onChange={this.onChangeHandler}
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
      </Aux>
    ) : (
      <Aux>
        <td
          className="ordinalNumber"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {ordinalNumber}
        </td>
        <td className="name">
          {item.name}
          <div className="quick-actions">
            <Button
              title="Wyświetl kalendarz"
              onClick={() =>
                this.setState({ ...this.state, showCalendar: true })
              }
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
            <CalendarQuickAddButton
              userId={loggedUser._id}
              eventId={item._id}
              selectedDate={item.termAt}
              eventType="Projekt"
              btnTitle="Dodaj do kalendarza"
              title="Szybkie dodanie"
              status="enabled"
            />
          </div>
        </td>
        <td
          className="createdAt"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
        </td>
        <td
          className="type"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {item.type}
        </td>
        <td
          className="signature"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {item.signature}
        </td>
        <td
          className="lastComment"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {item.lastComment}
        </td>
        <td
          className="termAt"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
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
              title="Pokaż szczegóły"
              onClick={() =>
                this.setState({ showItemDetails: !showItemDetails })
              }
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </Button>
            {editItem ? (
              <Button title="Zapisz rekord" onClick={this.updateItemHandler}>
                <FontAwesomeIcon icon={faPlusSquare} />
              </Button>
            ) : (
              <Button
                title="Rozwiń rekord"
                onClick={() => this.setState({ moreItem: !moreItem })}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            )}
            <Button
              // className="edit"
              onClick={() => this.setState({ editItem: !editItem })}
              title="Edytuj rekord"
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
        {showItemDetails ? (
          <ModalDialog
            width="1400px"
            showModal={() => this.setState({ showItemDetails: false })}
          >
            <ProjectsDetailsContainer item={item} />
          </ModalDialog>
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
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps)(ProjectsBasicItem);
