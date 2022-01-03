import React, { Component } from "react";
import { connect } from "react-redux";

import StagesListContainer from "../../../Stages/components/StagesListContainer";
import StagesAddForm from "../../../Stages/components/StagesAddForm";
import { fetchStages } from "../../../Stages/actions";
import ProjectsDetailsInfo from "./ProjectsDetailsInfo";
import { Button } from "../../../../themes/basic";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledProjectDetailsContainer } from "../../styles/details/StyledProjectDetailsContainer";

class ProjectsDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectUsers: this.getProjectUsers(),
      toggleStageAddForm: false,
    };
  }
  componentDidMount() {
    const { item, fetchStages } = this.props;
    fetchStages({ projectId: item._id });
  }
  getProjectUsers = () => {
    const { users, item } = this.props;
    const projectUsers = users.filter((user) => {
      if (user.projects) {
        const projects = user.projects.split(",");
        if (projects.includes(item.name)) {
          return user;
        }
      }
    });
    return projectUsers;
  };
  
  render() {
    console.log('state',this.state);
    const { toggleStageAddForm, projectUsers } = this.state;
    const { item } = this.props;

    const stageListContent = <StagesListContainer />;

    const stageAddFormContent = toggleStageAddForm ? (
      <StagesAddForm projectId={item._id} />
    ) : null;
    const projectInfoContent = <ProjectsDetailsInfo item={item} />;

    const userInfoData =
      projectUsers.length > 0
        ? projectUsers.map((user) => (
            <div className="user" key={user._id}>
              <div className="name">
                <span>Imię i nazwisko/Nazwa:</span>
                <span>{user.name}</span>
              </div>
              <div className="address">
                <span>Adres:</span>
                <span>{user.address}</span>
              </div>
              <div className="phone">
                <span>Telefon:</span>
                <span>{user.phone}</span>
              </div>
              <div className="email">
                <span>Mail:</span>
                <span>{user.email}</span>
              </div>
            </div>
          ))
        : null;
    const usersInfoContent = (
      <div className="users-info-box">
        <h1>Dane klienta</h1>
        <div className="users-box">{userInfoData}</div>
      </div>
    );
    return (
      <StyledProjectDetailsContainer>
        <div className="project-details-container-box">
          <h1>
            {item.name}:
            <span style={{ fontSize: "20px", marginLeft: "15px" }}>
              {projectUsers.length > 0
                ? projectUsers.map((user) => (
                    <span key={user._id} style={{ paddingRight: "5px" }}>
                      {user.name}
                    </span>
                  ))
                : "Brak przypisanej osoby !"}
            </span>
          </h1>
          {projectInfoContent}
          {projectUsers.length > 0 ? usersInfoContent : null}
          <Button
            onClick={() =>
              this.setState({ toggleStageAddForm: !toggleStageAddForm })
            }
            title="Wyświetl / ukryj formularz dodawania etapu"
          >
            <FontAwesomeIcon
              icon={toggleStageAddForm ? faToggleOn : faToggleOff}
            />
            <span>Dodaj etap</span>
          </Button>
          {stageAddFormContent}
          {stageListContent}
        </div>
      </StyledProjectDetailsContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};
export default connect(mapStateToProps, { fetchStages })(
  ProjectsDetailsContainer
);
