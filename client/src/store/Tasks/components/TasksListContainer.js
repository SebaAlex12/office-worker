import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";
import { sortArray } from "../../../common/tools";
import { removeTask, updateTask } from "../actions";
import TasksBasicList from "./TasksBasicList";
import FiltersContainer from "../../Filters/components/FiltersContainer";

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
    this.setState({
      tasks: tasks,
    });
  };
  removeTasksHandler = (id) => {
    const { removeTask } = this.props;

    const result = window.confirm("Czy na pewno chcesz usunąć zadanie!");

    if (result) {
      removeTask(id);
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
    console.log("event.target.name", event.target.name);
    if (event.target.name !== undefined && event.target.name.length > 0) {
      const filteredTasks = tasks.filter((item) => {
        console.log("item", item);
        console.log("item[event.target.name]", item[event.target.name]);
        if (item[event.target.name] !== undefined) {
          return (
            item[event.target.name]
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) !== -1
          );
        }
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
  filterItem = (item) => {
    const { filters } = this.props;
    let result = false;

    filters.statuses.forEach((status) => {
      if (status.active === true) {
        if (status.name === item.status) {
          result = true;
        }
      }
    });
    return result;
  };
  render() {
    let { filteredTasks } = this.state;

    filteredTasks = filteredTasks.filter((task) =>
      this.filterItem(task) ? task : null
    );

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
      <p>Trwa wczytywanie listy zadań...</p>
    );
    return (
      <StyledTaskListContainer>
        <div className="task-list-container-box">
          <FiltersContainer />
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
    filters: state.filters.filters,
  };
};

export default connect(mapStateToProps, { removeTask, updateTask })(
  TasksListContainer
);
