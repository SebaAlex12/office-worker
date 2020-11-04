import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledProjectListContainer } from "../styles/StyledProjectListContainer";
import { sortArray } from "../../../common/tools";
import { removeProject, updateProject } from "../actions";
import ProjectsBasicList from "./ProjectsBasicList";

class ProjectsListContainer extends Component {
  constructor(props) {
    super(props);
    const { projects } = this.props;
    this.state = {
      projects: projects,
      filteredProjects: projects,
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("component will resive props");
    // console.log("next props", nextProps);
    if (nextProps.projects !== this.state.projects) {
      this.setState({
        ...this.state,
        projects: nextProps.projects,
        filteredProjects: nextProps.projects,
      });
    }
  }
  sortItems = (column, direction) => {
    let { projects } = this.state;

    if (direction === "asc") {
      sortArray(projects, column);
    }
    if (direction === "desc") {
      sortArray(projects, column, -1);
    }
    console.log("projects", projects);
    this.setState({
      projects: projects,
    });
  };
  removeProjectsHandler = (id) => {
    // const { projects, filteredProjects } = this.state;
    const { removeProject } = this.props;

    const result = window.confirm(
      "Czy na pewno chcesz usunąć wybraną sprawę !"
    );

    if (result) {
      removeProject(id);
      // if (response) {
      //   this.setState({
      //     projects: projects.filter((item) => item._id !== id),
      //     filteredProjects: filteredProjects.filter((item) => item._id !== id),
      //   });
      // }
    }
  };
  updateProjectsHandler = async (element) => {
    const { projects } = this.state;
    const { updateProject } = this.props;

    const response = await updateProject(element);
    if (response) {
      this.setState({
        projects: projects.map((item) =>
          item._id === element._id ? element : item
        ),
      });
    }
  };
  onChangeProjectsSearcherHandler = (event) => {
    const { projects } = this.state;
    if (event.target.name !== undefined) {
      const filteredProjects = projects.filter((item) => {
        return (
          item[event.target.name].toLowerCase().indexOf(event.target.value) !==
          -1
        );
      });
      this.setState({
        filteredProjects: filteredProjects,
      });
    } else {
      this.setState({
        filteredProjects: projects,
      });
    }
  };
  render() {
    const { filteredProjects } = this.state;
    let n = 1;
    const projectListContent = filteredProjects ? (
      <Aux key={n++}>
        <ProjectsBasicList
          items={filteredProjects}
          sortItems={this.sortItems}
          removeItem={this.removeProjectsHandler}
          updateItem={this.updateProjectsHandler}
          searchItem={this.onChangeProjectsSearcherHandler}
        />
      </Aux>
    ) : (
      <p>Trwa wczytywanie listy spraw...</p>
    );
    return (
      <StyledProjectListContainer>
        <div className="project-list-container-box">
          <div className="title-box">
            <div className="list-counter">
              Liczba elementów: {filteredProjects.length}
            </div>
            <h2>Lista spraw</h2>
          </div>
          {projectListContent}
        </div>
      </StyledProjectListContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
  };
};

export default connect(mapStateToProps, { removeProject, updateProject })(
  ProjectsListContainer
);
