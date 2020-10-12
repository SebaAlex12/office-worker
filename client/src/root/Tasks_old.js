import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import TasksListContainer from "../store/Tasks/components/TasksListContainer";
// import TasksList from "../store/Tasks/components/TasksList";
import UsersList from "../store/Users/components/UsersList";
import ProjectsList from "../store/Projects/components/ProjectsList";
import FiltersContainer from "../store/Filters/components/FiltersContainer";

import { fetchFilters } from "../store/Filters/actions";
import { updateSettings } from "../store/Settings/actions";
import { fetchUsersHistory } from "../store/UsersHistory/actions";
import { fetchCalendars } from "../store/Calendar/actions";

import {
  fetchProjects,
  fetchProjectsByLoggedUserProjects,
} from "../store/Projects/actions";
import {
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  sendMailingTask,
} from "../store/Tasks/actions";

class Tasks extends Component {
  componentDidMount() {
    const {
      fetchFilters,
      fetchProjects,
      fetchUsersHistory,
      fetchProjectsByLoggedUserProjects,
      fetchTasks,
      fetchCalendars,
      loggedUser: { status, name, projects, company, _id },
    } = this.props;

    fetchFilters();
    fetchUsersHistory();
    fetchCalendars(_id);

    if (status === "SuperAdministrator") {
      fetchProjects();
    } else if (status === "Administrator") {
      fetchProjects({});
    } else if (status === "Menedżer") {
      fetchProjectsByLoggedUserProjects(projects);
    } else {
      // console.log("fetchProjectsByLoggedUserProjects", projects);
      fetchProjectsByLoggedUserProjects(projects);
    }

    let filters = this.props.filters ? this.props.filters : null;

    if (filters) {
      const { projectName, responsiblePerson } = filters;
      if (status === "Klient") {
        fetchTasks({ responsiblePerson: name });
      } else if (status === "Pracownik") {
        fetchTasks({ responsiblePerson: name });
      } else {
        // fetchTasks({ projectName, responsiblePerson });
        fetchTasks({ responsiblePerson: name });
      }
      this.setState({
        filters: {
          projectName,
          responsiblePerson,
        },
      });
    }

    // if (filters) console.log("filters", filters);
  }
  componentDidUpdate(prevProps) {
    const {
      loggedUser: { status, projects },
      fetchTasks,
      fetchTasksByLoggedUserProjects,
      filters: { projectName, responsiblePerson },
      settings: { _id, mailingDate },
      sendMailingTask,
      updateSettings,
    } = this.props;

    if (mailingDate !== prevProps.mailingDate) {
      const difference = moment(new Date()).diff(mailingDate, "minutes");
      const presentDay = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
      // check mailing list after 10 hours
      if (difference > 600) {
        sendMailingTask();
        updateSettings({ _id, mailingDate: presentDay });
        // console.log("sending mailing");
        // console.log("difference", difference);
      }
    }

    if (
      projectName !== prevProps.filters.projectName ||
      responsiblePerson !== prevProps.filters.responsiblePerson
    ) {
      // console.log("prev res person", prevProps.filters.responsiblePerson);
      // console.log("res pers", responsiblePerson);

      if (status === "Administrator") {
        fetchTasks({ projectName, responsiblePerson });
      } else {
        // fetchTasks({ projectName, responsiblePerson });
        // console.log("logged user", loggedUser);
        fetchTasksByLoggedUserProjects({
          projectName,
          responsiblePerson,
          projects,
        });
      }
      this.setState({
        filters: {
          projectName,
          responsiblePerson,
        },
      });
    }
    // console.log("this props update", this.props);
  }
  render() {
    const { loggedUser } = this.props;

    return (
      <div className="tasks-box">
        {loggedUser.status !== "Klient" ? <ProjectsList /> : null}
        {loggedUser.status === "SuperAdministrator" ||
        loggedUser.status === "Administrator" ||
        loggedUser.status === "Menedżer" ? (
          <UsersList />
        ) : null}
        {/* <TasksList /> */}
        <FiltersContainer />
        <TasksListContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
    settings: state.settings.settings,
  };
};

export default connect(mapStateToProps, {
  fetchFilters,
  fetchProjects,
  fetchProjectsByLoggedUserProjects,
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  fetchUsersHistory,
  fetchCalendars,
  sendMailingTask,
  updateSettings,
})(Tasks);
