import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
// import uuid from "react-uuid";

// interfaces
import { ItaskElement } from "../interfaces/general";
import { IProjectElement } from "../../Projects/interfaces/general";
import { ImessageElement } from "../../Messages/interfaces/general";
import { IuserElement } from "../../Users/interfaces/general";

// import { formValidator } from "../../../common/tools";
import { priorities, statuses } from "../../ini";
import { addTask } from "../actions";
import { updateMessages } from "../../Messages/actions";
import { addUserHistory } from "../../UsersHistory/actions";

import { StyledTaskForm } from "../styles/StyledTaskForm";

interface Iprops {
  loggedUser: IuserElement,
  projects: Array<IProjectElement>,
  users: Array<IuserElement>,
  addTask(data:any):any,
  updateMessages(data:any):any,
  addUserHistory(data:any):void,
  closeAddFormHandler():void,
};

interface Istate {
  projectId: number,
  createdByUserId: number,
  responsiblePersonId: number,
  title: string,
  description: string,
  responsiblePersonLastComment: any,
  priority: string,
  status: string,
  termAt: string,
  validation: any,
  errors: []
}

class TasksAddForm extends Component<Iprops,Istate> {
  constructor(props:Iprops) {
    super(props);
    this.state = {
      projectId: 0,
      createdByUserId: 0,
      responsiblePersonId: 0,
      title: "",
      description: "",
      responsiblePersonLastComment: false,
      priority: "Normalny",
      status: "Do wykonania",
      termAt: "",
      validation: [
        {
          id: 1,
          name: "responsiblePersonId",
          required: [true, "Odpowiedzialna osoba jest wymagana"],
        },
        {
          name: "title",
          required: [true, "Tytuł jest wymagany"],
        },
        {
          name: "status",
          required: [true, "Status jest wymagany"],
        },
        {
          name: "priority",
          required: [true, "Priorytet jest wymagany"],
        },
      ],
      errors: [],
    };
  }
  onChangeInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  addHandler = async (event: any) => {
    const {
      addTask,
      loggedUser,
      updateMessages,
      addUserHistory,
      closeAddFormHandler,
    } = this.props;
    const {
      projectId,
      responsiblePersonId,
      title,
      description,
      responsiblePersonLastComment,
      priority,
      status,
      termAt,
      validation,
    } = this.state;

    let errors:[] = [];

    const data = {
      projectId,
      createdByUserId: loggedUser._id,
      responsiblePersonId: responsiblePersonId,
      title,
      description,
      responsiblePersonLastComment,
      priority,
      status,
      termAt,
    };

    event.preventDefault();
// todo typescript
    // validation.forEach((val:any) => {
    //   let result = formValidator(data[val.name:any], val);
    //   if (result[0] === false) errors.push(result);
    // });

    this.setState({
      errors: errors,
    });

    const response = await addTask(data);

    if (errors.length === 0) {
      closeAddFormHandler();
    }

    const alertData = {
      from: loggedUser.name,
      to: responsiblePersonId,
      msg: title,
      priority: priority,
      topic: "masz nowe zadanie: " + title,
      type: "task_add",
      createAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    };

    if (response) {
      updateMessages({ alert: alertData });
    }

    addUserHistory({
      userId: loggedUser._id,
      userName: loggedUser.name,
      taskCreatedBy: loggedUser.name,
      taskTitle: title,
      event: "dodane nowe zadanie",
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    });
  };
  render() {
    const { projects } = this.props;
    const { priority, status, errors } = this.state;

    console.log("project state", this.state);
    // console.log(projects);

    // const loggedUserProjects = loggedUser.projects
    //   ? loggedUser.projects.split(",")
    //   : [];
    // const loggedUserUsers = loggedUser.users ? loggedUser.users.split(",") : [];

    // console.log("projects", loggedUserProjects);
    // console.log("compon state", this.state);

    // filter users compare to selected projects
    let users;

    users = this.props.users.filter((user:IuserElement) => {
      if (user.status === "Administrator" || user.status === "Menedżer") {
        return user;
      }
      return null;
    });

    const errorsContent =
      errors.length > 0
        ? errors.map((error, index) => {
            return (
              <div key={index} className="item">
                {error[1]}
              </div>
            );
          })
        : null;

    return (
      <StyledTaskForm>
        <div className="task-add-form-box">
          <div className="form-errors-box">{errorsContent}</div>
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="title"
                className="form-control"
                placeholder="Tytuł"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={this.onChangeInput}
                name="description"
                className="form-control"
                rows={10}
                placeholder="Opis"
                required
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="priority"
                value={priority}
                required
                disabled={true}
              >
                <option value="">Wybierz priorytet</option>
                {priorities
                  ? priorities.map((prt) => {
                      return (
                        <option
                          key={prt._id}
                          value={prt.name}
                          defaultValue={prt.name === status ? "selected" : ""}
                        >
                          {prt.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Termin wykonania</label>
              <input
                onChange={this.onChangeInput}
                type="datetime-local"
                name="termAt"
                className="form-control"
                placeholder="Termin"
                required
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="projectId"
                required
              >
                <option value="">Wybierz sprawę</option>
                {projects
                  ? projects.map((project) => {
                      let option:any;
                      // if (
                      //   loggedUser.status === "Administrator" ||
                      //   loggedUserProjects.includes(project.name)
                      // ) {
                      option = (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>
                      );
                      return option;
                      // }
                      // return;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="responsiblePersonId"
                required
              >
                <option value="">Przypisz do</option>
                {users
                  ? users.map((user) => {
                      let option:any;
                      // if (
                      //   loggedUser.status === "Administrator" ||
                      //   loggedUserUsers.includes(user.name)
                      // ) {
                      option = (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      );
                      return option;
                      // }
                      // return;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="status"
                value={status}
                required
                disabled={true}
              >
                <option value="">Wybierz stan</option>
                {statuses
                  ? statuses.map((sts) => {
                      return (
                        <option
                          key={sts._id}
                          defaultValue={sts.name === status ? "selected" : ""}
                        >
                          {sts.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </form>
        </div>
      </StyledTaskForm>
    );
  }
}

const mapStateToProps = (
    state:{
      users:{ users:Array<IuserElement>, logged_user: IuserElement},
      projects:{ projects:Array<IProjectElement>},  
    }
  ) => {
  return {
    users: state.users.users,
    projects: state.projects.projects,
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, {
  addTask,
  updateMessages,
  addUserHistory,
})(TasksAddForm);
