import React, { Component } from "react";
import { connect } from "react-redux";

import { updateUser } from "../actions";
import { user_statuses } from "../../ini";

import { updateMessages } from "../../Messages/actions";

class UsersEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      status: "",
      selectedProjects: [],
      selectedUsers: [],
    };
  }
  componentDidMount() {
    const { item } = this.props;
    console.log(item);
    this.setState({
      _id: item._id ? item._id : "",
      name: item.name ? item.name : "",
      email: item.email ? item.email : "",
      address: item.address ? item.address : "",
      phone: item.phone ? item.phone : "",
      password: item.password ? item.password : "",
      status: item ? item.status : "",
      selectedProjects: item.projects ? item.projects.split(",") : [],
      selectedUsers: item.users ? item.users.split(",") : [],
    });
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeUsersMultiCheckbox = (event) => {
    let { selectedUsers } = this.state;

    selectedUsers.includes(event.currentTarget.value)
      ? (selectedUsers = selectedUsers.filter(
          (item) => item !== event.currentTarget.value
        ))
      : selectedUsers.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedUsers: selectedUsers,
    });
  };
  onChangeProjectsMultiCheckbox = (event) => {
    let { selectedProjects } = this.state;

    selectedProjects.includes(event.currentTarget.value)
      ? (selectedProjects = selectedProjects.filter(
          (item) => item !== event.currentTarget.value
        ))
      : selectedProjects.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedProjects: selectedProjects,
    });
  };
  updateHandler = (event) => {
    const { updateUser, updateMessages } = this.props;
    const {
      _id,
      name,
      email,
      address,
      phone,
      password,
      status,
      selectedProjects,
      selectedUsers,
    } = this.state;

    const data = {
      _id,
      name,
      email,
      address,
      phone,
      password,
      status,
      projects: selectedProjects,
      users: selectedUsers,
    };
    console.log("data user", data);
    const response = updateUser(data);
    if (response) {
      updateMessages([
        { name: "Użytkownik" },
        { value: "dane zostały zmienione" },
      ]);
    }
    event.preventDefault();
  };
  render() {
    const {
      name,
      email,
      address,
      phone,
      password,
      status,
      selectedProjects,
    } = this.state;
    const { loggedUser } = this.props;
    let { projects } = this.props;
    let projectContent = "";

    if (projects && loggedUser) {
      if (loggedUser.status !== "Administrator") {
        projects = loggedUser.projects.split(",");
      } else {
        projects = projects.map((item) => item.name);
      }
    }
    if (projects) {
      let counter = 1;
      projectContent = projects.map((project) => {
        return (
          <div className="checkbox-item" key={counter++}>
            <input
              type="checkbox"
              name={project}
              value={project}
              onChange={this.onChangeProjectsMultiCheckbox}
              checked={selectedProjects.includes(project)}
            />
            <div>{project}</div>
          </div>
        );
      });
    }
    return (
      <div
        className="user-update-form-box mt-3 mb-3"
        style={{ backgroundColor: "#fff", padding: "5px" }}
      >
        <form action="post">
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="name"
              value={name}
              placeholder="Nazwa"
              disabled
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="address"
              value={address}
              placeholder="Adres"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="phone"
              value={phone}
              placeholder="Telefon"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="password"
              name="password"
              value={password}
              placeholder="Hasło"
              required
            />
          </div>
          <div className="form-group form-row">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="status"
              required
            >
              <option value="">Status</option>
              {user_statuses
                ? user_statuses.map((stats) => {
                    if (loggedUser.status === "Administrator") {
                      return (
                        <option
                          key={stats._id}
                          value={stats.name}
                          selected={stats.name === status ? "selected" : null}
                        >
                          {stats.name}
                        </option>
                      );
                    } else {
                      if (stats.name !== "Administrator") {
                        return (
                          <option
                            key={stats._id}
                            value={stats.name}
                            selected={stats.name === status ? "selected" : null}
                          >
                            {stats.name}
                          </option>
                        );
                      }
                    }
                  })
                : null}
            </select>
          </div>
          <div className="form-group form-row multi-checkboxes">
            <label>[Przypisane sprawy]</label>
            {projectContent}
          </div>
          {loggedUser.status === "Administrator" ? (
            <div className="form-group">
              <input
                onClick={this.updateHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="zapisz"
              />
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects,
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { updateUser, updateMessages })(
  UsersEditFrom
);
