import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";
import { sortArray } from "../../../common/tools";
import { removeTask, updateTask } from "../actions";
import TasksBasicList from "./TasksBasicList";

class TasksListContainer extends Component {
  constructor(props) {
    super(props);
    const { tasks } = this.props;
    this.state = {
      tasks: tasks,
      filteredTasks: tasks,
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("component will resive props");
    // console.log("next props", nextProps);
    if (nextProps.tasks !== this.state.tasks) {
      this.setState({
        ...this.state,
        tasks: nextProps.tasks,
        filteredTasks: nextProps.tasks,
      });
    }
  }
  sortItems = (column, direction) => {
    let { tasks } = this.state;

    if (direction === "asc") {
      sortArray(tasks, column);
    }
    if (direction === "desc") {
      sortArray(tasks, column, -1);
    }
    console.log("tasks", tasks);
    this.setState({
      tasks: tasks,
    });
  };
  removeTasksHandler = (id) => {
    // const { tasks, filteredTasks } = this.state;
    const { removeTask } = this.props;

    const result = window.confirm("Czy na pewno chcesz usunąć zadanie!");

    if (result) {
      removeTask(id);
      // if (response) {
      //   this.setState({
      //     tasks: tasks.filter((item) => item._id !== id),
      //     filteredTasks: filteredTasks.filter((item) => item._id !== id),
      //   });
      // }
    }
  };
  updateTasksHandler = async (element) => {
    const { tasks } = this.state;
    const { updateTask } = this.props;

    const response = await updateTask(element);
    if (response) {
      this.setState({
        tasks: tasks.map((item) => (item._id === element._id ? element : item)),
      });
    }
  };
  onChangeTasksSearcherHandler = (event) => {
    const { tasks } = this.state;
    if (event.target.name !== undefined) {
      const filteredTasks = tasks.filter((item) => {
        return (
          item[event.target.name].toLowerCase().indexOf(event.target.value) !==
          -1
        );
      });
      this.setState({
        filteredTasks: filteredTasks,
      });
    } else {
      this.setState({
        filteredTasks: tasks,
      });
    }
  };
  render() {
    const { filteredTasks } = this.state;
    let n = 1;
    const taskListContent = filteredTasks ? (
      <Aux key={n++}>
        <TasksBasicList
          items={filteredTasks}
          sortItems={this.sortItems}
          removeItem={this.removeTasksHandler}
          updateItem={this.updateTasksHandler}
          searchItem={this.onChangeTasksSearcherHandler}
        />
      </Aux>
    ) : (
      <p>Trwa wczytywanie listy spraw...</p>
    );
    return (
      <StyledTaskListContainer>
        <div className="task-list-container-box">
          <div className="title-box">
            <div className="list-counter">
              Liczba elementów: {filteredTasks.length}
            </div>
            <h2>Lista zadań</h2>
          </div>
          {taskListContent}
        </div>
      </StyledTaskListContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

export default connect(mapStateToProps, { removeTask, updateTask })(
  TasksListContainer
);
