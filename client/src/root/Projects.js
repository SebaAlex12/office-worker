import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchProjects,
  fetchProjectsByLoggedUserProjects,
} from "../store/Projects/actions";
import ProjectsListContainer from "../store/Projects/components/ProjectsListContainer";

import Aux from "../hoc/Auxiliary";
import TopNavigatorToolbar from "./TopNavigatorToolbar";

class Projects extends Component {
  constructor(props) {
    super(props);
    const {
      loggedUser: { status, projects },
      fetchProjects,
      fetchProjectsByLoggedUserProjects,
    } = this.props;
    switch (status) {
      case "Administrator":
        fetchProjects();
        break;
      case "Klient":
        fetchProjectsByLoggedUserProjects(projects);
        break;
      default:
        break;
    }
  }
  render() {
    const { projects } = this.props;
    const projectsContent =
      projects.length > 0 ? <ProjectsListContainer /> : null;
    return (
      <Aux>
        <TopNavigatorToolbar
          visibleButtons={{
            ProjectAddFormButton: true,
            UserRegistryFormButton: true,
          }}
        />
        {projectsContent}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects,
  };
};

export default connect(mapStateToProps, {
  fetchProjects,
  fetchProjectsByLoggedUserProjects,
})(Projects);
