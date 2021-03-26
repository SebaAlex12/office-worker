import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";
import { sortArray } from "../../../common/tools";
import { removeTask, updateTask } from "../actions";
import TasksBasicList from "./TasksBasicList";
import FiltersContainer from "../../Filters/components/FiltersContainer";

import { ItaskElement } from "../interfaces/general";
import { IfiltersElement } from "../../Filters/interfaces/general";

interface Iprops{
  tasks:Array<ItaskElement>,
  filters:IfiltersElement,
  removeTask(data:any):any,
  updateTask(data:any):any
}

interface Istate{
  tasks:Array<ItaskElement>,
  filteredTasks:Array<ItaskElement>
}

class TasksListContainer extends Component<Iprops,Istate> {
  constructor(props:Iprops) {
    super(props);
    const { tasks } = this.props;
    this.state = {
      tasks: tasks,
      filteredTasks: tasks,
    };
  }
  componentWillReceiveProps(nextProps:any): void {
    if (nextProps.tasks !== this.state.tasks) {
      this.setState({
        ...this.state,
        tasks: nextProps.tasks,
        filteredTasks: nextProps.tasks,
      });
    }
  }
  sortItems = (column:string, direction:string): void => {
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
  removeTasksHandler = (id:string): void => {
    const { removeTask } = this.props;

    const result = window.confirm("Czy na pewno chcesz usunąć zadanie!");

    if (result) {
      removeTask(id);
    }
  };
  updateTasksHandler = async (element:ItaskElement) => {
    const { tasks } = this.state;
    const { updateTask } = this.props;

    const response = await updateTask(element);
    if (response) {
      this.setState({
        tasks: tasks.map((item) => (item._id === element._id ? element : item)),
      });
    }
  };
  onChangeTasksSearcherHandler = (event: { target: { name: string, value: string } }): void => {
    const { tasks } = this.state;
    const eventName = event.target.name;

    if (eventName !== undefined && eventName.length > 0) {
      const filteredTasks = tasks.filter((item) => {
        // if (item[eventName] !== undefined) {
        //   return (
        //     item[eventName]
        //       .toLowerCase()
        //       .indexOf(event.target.value.toLowerCase()) !== -1
        //   );
        // }
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
  filterItem = (item: ItaskElement): boolean => {
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

const mapStateToProps = (state:any) => {
  return {
    tasks: state.tasks.tasks,
    filters: state.filters.filters,
  };
};

export default connect(mapStateToProps, { removeTask, updateTask })(
  TasksListContainer
);
