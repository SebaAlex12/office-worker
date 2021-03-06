import React, { Component } from "react";
import Styled from "styled-components";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TasksAddForm from "../store/Tasks/components/TasksAddForm";
import ProjectsList from "../store/Projects/components/ProjectsList";
import ProjectsAddForm from "../store/Projects/components/ProjectsAddForm";
import UsersList from "../store/Users/components/UsersList";
import RegistryForm from "../store/Users/components/RegistryForm";
import IncomingMailsAddForm from "../store/IncomingMails/components/IncomingMailsAddForm";
import OutgoingMailsAddForm from "../store/OutgoingMails/components/OutgoingMailsAddForm";
import { BiggerButton } from "../themes/basic";

class TopNavigatorToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTasksAddForm: false,
      toggleRegistryForm: false,
      toggleProjectsAddForm: false,
      toggleComingMailsAddForm: false,
      toggleOutgoingMailsAddForm: false
    };
  }
  closeProjectsAddForm = () => {
    this.setState({
      ...this.state,
      toggleProjectsAddForm: false,
    });
  };
  closeTasksAddForm = () => {
    this.setState({
      ...this.state,
      toggleTasksAddForm: false,
    });
  };
  closeRegistryForm = () => {
    this.setState({
      ...this.state,
      toggleRegistryForm: false,
    });
  };
  closeComingMailsAddForm = () => {
    this.setState({
      ...this.state,
      toggleComingMailsAddForm: false,
    });
  };
  closeOutgoingMailsAddForm = () => {
    this.setState({
      ...this.state,
      toggleOutgoingMailsAddForm: false,
    });
  };
  render() {
    const {
      toggleTasksAddForm,
      toggleProjectsAddForm,
      toggleRegistryForm,
      toggleComingMailsAddForm,
      toggleOutgoingMailsAddForm
    } = this.state;

    const visibleButtons = this.props.visibleButtons
      ? this.props.visibleButtons
      : {};

    const projectShortListContent = <ProjectsList />;
    const userShortListContent = <UsersList />;
    const taskAddFormContent = (
      <div className="item">
        <BiggerButton
          variant="primary"
          title="Rozwiń formularz"
          onClick={() =>
            this.setState({
              toggleTasksAddForm: !toggleTasksAddForm,
            })
          }
          // disabled={true}
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <span>Dodaj zadanie</span>
        </BiggerButton>
        {toggleTasksAddForm ? (
          <TasksAddForm closeAddFormHandler={this.closeTasksAddForm} />
        ) : null}
      </div>
    );
    const comingMailAddFormContent = (
      <div className="item">
        <BiggerButton
          variant="primary"
          title="Rozwiń formularz"
          onClick={() =>
            this.setState({
              toggleComingMailsAddForm: !toggleComingMailsAddForm,
            })
          }
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <span>Dodaj wpis</span>
        </BiggerButton>
        {toggleComingMailsAddForm ? (
          <IncomingMailsAddForm
            closeAddFormHandler={this.closeComingMailsAddForm}
          />
        ) : null}
      </div>
    );
    const outgoingMailAddFormContent = (
      <div className="item">
        <BiggerButton
          variant="primary"
          title="Rozwiń formularz"
          onClick={() =>
            this.setState({
              toggleOutgoingMailsAddForm: !toggleOutgoingMailsAddForm,
            })
          }
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <span>Dodaj wpis</span>
        </BiggerButton>
        {toggleOutgoingMailsAddForm ? (
          <OutgoingMailsAddForm
            closeAddFormHandler={this.closeOutgoingMailsAddForm}
          />
        ) : null}
      </div>
    );
    const projectAddFormContent = (
      <div className="item">
        <BiggerButton
          variant="primary"
          title="Rozwiń formularz"
          onClick={() =>
            this.setState({
              toggleProjectsAddForm: !toggleProjectsAddForm,
            })
          }
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <span>Dodaj sprawę</span>
        </BiggerButton>
        {toggleProjectsAddForm ? (
          <ProjectsAddForm closeAddFormHandler={this.closeProjectsAddForm} />
        ) : null}
      </div>
    );
    const userRegistryFormContent = (
      <div className="item">
        <BiggerButton
          variant="primary"
          title="Rozwiń formularz"
          onClick={() =>
            this.setState({
              toggleRegistryForm: !toggleRegistryForm,
            })
          }
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <span>Dodaj użytkownika</span>
        </BiggerButton>
        {toggleRegistryForm ? (
          <RegistryForm closeAddFormHandler={this.closeRegistryForm} />
        ) : null}
      </div>
    );
    return (
      <StyledTopNavigatorToolbar>
        <div className="panel-navigator-box">
          <div className="panel-left-navigator-box">
            {projectShortListContent}
            {userShortListContent}
          </div>
          <div className="panel-right-navigator-box">
            {visibleButtons.TaskAddFormButton ? taskAddFormContent : null}
            {visibleButtons.ProjectAddFormButton ? projectAddFormContent : null}
            {visibleButtons.IncomingMailAddFormButton
              ? comingMailAddFormContent
              : null}
            {visibleButtons.OutgoingMailAddFormButton
              ? outgoingMailAddFormContent
              : null}
            {visibleButtons.UserRegistryFormButton
              ? userRegistryFormContent
              : null}
          </div>
        </div>
      </StyledTopNavigatorToolbar>
    );
  }
}

export default TopNavigatorToolbar;

const StyledTopNavigatorToolbar = Styled.div`
    .panel-left-navigator-box,
    .panel-right-navigator-box {
        position: fixed;
        display: flex;
        top: 5px;
        z-index:10;
    }
    .panel-left-navigator-box {
    left: 5px;
    }
    .panel-right-navigator-box {
    right: 5px;
    }
    .panel-navigator-box .item{
        position:relative;
    }
    .panel-navigator-box .item > div{
        position:absolute;
        top:50px;
    }
    .panel-right-navigator-box .item > div{
        right:4px;
        min-width:320px;
    }
`;
