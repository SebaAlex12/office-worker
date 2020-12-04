import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { projectTypes } from "../../ini";
import DateTimeFormat from "../../../common/DateTimeFormat";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import ProjectsDetailsContainer from "./details/ProjectsDetailsContainer";
// import CalendarContainer from "../../Calendar/components/CalendarContainer";
// import CalendarQuickAddButton from "../../Calendar/components/CalendarQuickAddButton";

class ProjectsBasicItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: {
        ...item,
        signature: item.signature ? JSON.parse(item.signature) : [],
        organ: item.organ ? JSON.parse(item.organ) : [],
      },
      showItemDetails: false,
      // showCalendar: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { item } = this.props;
    if (
      prevProps.item.name !== item.name ||
      prevProps.item.signature !== item.signature ||
      prevProps.item.organ !== item.organ ||
      prevProps.item.lastStageCreatedAt !== item.lastStageCreatedAt ||
      prevProps.item.lastStageDescription !== item.lastStageDescription
    ) {
      this.setState({
        ...this.state,
        item: {
          ...item,
          name: item.name,
          signature: item.signature ? JSON.parse(item.signature) : [],
          organ: item.organ ? JSON.parse(item.organ) : [],
          lastStageCreatedAt: item.lastStageCreatedAt,
          lastStageDescription: item.lastStageDescription,
        },
      });
    }
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
      // showCalendar,
    } = this.state;
    const { removeItem, ordinalNumber, loggedUser } = this.props;

    const signatureContent = item.signature.map((element) => {
      return (
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#e6e6e6",
            padding: "5px 10px",
            margin: "4px",
          }}
          key={element.id}
        >
          {element.name}
        </span>
      );
    });

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
            disabled={true}
          />
          {/* <div className="quick-actions">
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
          </div> */}
        </td>
        <td className="createdAt">
          {" "}
          <TextFieldGroup
            type="datetime-local"
            title={item.createdAt}
            onChange={this.onChangeHandler}
            name="createdAt"
            value={item.createdAt}
            disabled={true}
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
            disabled={true}
          />
        </td>
        <td className="lastStageDescription">
          <TextFieldGroup
            type="text"
            title={item.lastStageDescription}
            onChange={this.onChangeHandler}
            name="lastStageDescription"
            value={item.lastStageDescription}
            disabled={true}
          />
        </td>
        <td className="lastStageCreatedAt">
          <TextFieldGroup
            type="datetime-local"
            title={item.lastStageCreatedAt}
            onChange={this.onChangeHandler}
            name="lastStageCreatedAt"
            value={item.lastStageCreatedAt}
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
        <td
          className="ordinalNumber"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {ordinalNumber}
        </td>
        <td
          className="name"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {item.name}
          {/* <div className="quick-actions">
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
          </div> */}
        </td>
        <td
          className="createdAt"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          <DateTimeFormat date={item.createdAt} short={true} />
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
          {signatureContent}
        </td>
        <td
          className="lastStageDescription"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          {item.lastStageDescription}
        </td>
        <td
          className="lastStageCreatedAt"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          <DateTimeFormat date={item.lastStageCreatedAt} short={true} />
        </td>
        <td
          className="termAt"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ showItemDetails: !showItemDetails })}
        >
          <DateTimeFormat date={item.termAt} short={true} />
        </td>
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            {/* <Button
              className="show-item-details"
              title="Pokaż szczegóły"
              onClick={() =>
                this.setState({ showItemDetails: !showItemDetails })
              }
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </Button> */}
            <Button
              title="Rozwiń rekord"
              onClick={() => this.setState({ moreItem: !moreItem })}
              disabled={true}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
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
                onClick={() => this.setState({ editItem: !editItem })}
                title="Edytuj rekord"
                disabled={true}
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
            <td colSpan="10"></td>
          </tr>
        ) : null}
        <tr>
          <td>
            {showItemDetails ? (
              <ModalDialog
                width="1330px"
                showModal={() => this.setState({ showItemDetails: false })}
              >
                <ProjectsDetailsContainer item={item} />
              </ModalDialog>
            ) : null}
          </td>
        </tr>
        {/* {showCalendar ? (
          <ModalDialog
            width="1330px"
            showModal={() => this.setState({ showCalendar: false })}
          >
            <CalendarContainer />
          </ModalDialog>
        ) : null} */}
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
