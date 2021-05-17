import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchTasks } from "../store/Tasks/actions";
import TasksListContainer from "../store/Tasks/components/TasksListContainer";

import Aux from "../hoc/Auxiliary";
import TopNavigatorToolbar from "./TopNavigatorToolbar";

class Tasks extends Component {
  constructor(props) {
    super(props);
    const {
      loggedUser: { status, _id },
      fetchTasks,
    } = this.props;
    switch (status) {
      case "Administrator":
        fetchTasks({userStatus: status});
      break;
      default:
        fetchTasks({userStatus: status, responsiblePersonId: _id, createdByUserId: _id})
      break;
    }
  }
  render() {
    const { tasks } = this.props;
    const tasksContent = tasks.length > 0 ? <TasksListContainer /> : null;
    return (
      <Aux>
        <TopNavigatorToolbar
          visibleButtons={{
            TaskAddFormButton: true,
            UserRegistryFormButton: true,
          }}
        />
        {tasksContent}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    tasks: state.tasks.tasks,
  };
};

export default connect(mapStateToProps, {
  fetchTasks,
})(Tasks);
