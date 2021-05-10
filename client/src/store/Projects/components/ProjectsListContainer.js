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
      filteredProjects: projects.filter(project=>project.status != "archiwalny"),
      showArchiveCases: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.projects !== this.state.projects) {
      this.setState({
        ...this.state,
        projects: nextProps.projects,
        filteredProjects: this.archiveCaseSwitcherFilter(nextProps.projects,nextProps.showArchiveCases),
      });
    }
  }
  componentDidUpdate(){
    console.log("updated state",this.state);
  }
  sortItems = (column, direction) => {
    const { showArchiveCases } = this.state;
    // let { projects } = this.props;
    let { filteredProjects } = this.state;
    filteredProjects = this.archiveCaseSwitcherFilter(filteredProjects, showArchiveCases);

    console.log("sort filteredProjects",filteredProjects);

    if (direction === "asc") {
      sortArray(filteredProjects, column);
    }
    if (direction === "desc") {
      sortArray(filteredProjects, column, -1);
    }
    this.setState({
      filteredProjects: filteredProjects,
    });
  };
  removeProjectsHandler = (id) => {
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
    const { showArchiveCases } = this.state;
    const { updateProject } = this.props;
    let { projects } = this.props;
    projects = this.archiveCaseSwitcherFilter(projects, showArchiveCases);

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
    const { showArchiveCases } = this.state;
    let { projects } = this.props;
    projects = this.archiveCaseSwitcherFilter(projects, showArchiveCases);

    if (event.target.name !== undefined && event.target.name.length > 0) {
      const filteredProjects = projects.filter((item) => {
        return (
          item[event.target.name]
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
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
  archiveCaseSwitcherHandler = () => {
    const { showArchiveCases } = this.state;
    const { projects } = this.props;
    this.setState({
      ...this.state,
      filteredProjects: this.archiveCaseSwitcherFilter(projects,!showArchiveCases),
      showArchiveCases: !showArchiveCases
    })
  }
  archiveCaseSwitcherFilter = (projects, showArchiveCases) => {
    let filteredProjects = projects;
    if(showArchiveCases !== null){
      filteredProjects = showArchiveCases ? 
      projects.filter(project=>project.status==="archiwalny") : 
      projects.filter(project=>project.status!="archiwalny");
    }
    return filteredProjects;
  }
  render() {
    const { filteredProjects } = this.state;

console.log("render check", filteredProjects);

    let n = 1;
    const projectListContent = filteredProjects ? (
      <Aux key={n++}>
        <ProjectsBasicList
          items={filteredProjects}
          sortItems={this.sortItems}
          removeItem={this.removeProjectsHandler}
          updateItem={this.updateProjectsHandler}
          searchItem={this.onChangeProjectsSearcherHandler}
          archiveCaseSwitcherHandler={this.archiveCaseSwitcherHandler}
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
