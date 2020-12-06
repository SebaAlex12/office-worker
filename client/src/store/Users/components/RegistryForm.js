import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions";
import { user_statuses } from "../../ini";

import { formValidator } from "../../../common/tools";
import { StyledUserForm } from "../styles/StyledUserForm";

class RegistryForm extends Component {
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
      validation: [
        {
          name: "name",
          required: [true, "Nazwa jest wymagana"],
        },
        {
          name: "status",
          required: [true, "Status jest wymagany"],
        },
      ],
      errors: [],
    };
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
  registerHandler = (event) => {
    event.preventDefault();
    const { registerUser, loggedUser, closeAddFormHandler } = this.props;

    const {
      name,
      email,
      address,
      phone,
      password,
      status,
      selectedProjects,
      selectedUsers,
      validation,
    } = this.state;

    const data = {
      name,
      email,
      address,
      phone,
      password,
      status,
      projects: selectedProjects,
      users: selectedUsers,
    };

    let errors = [];

    validation.forEach((val) => {
      let result = formValidator(data[val.name], val);
      if (result[0] === false) errors.push(result);
    });

    this.setState({
      errors: errors,
    });

    registerUser(data);

    if (errors.length === 0) {
      closeAddFormHandler();
    }
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
  render() {
    const {
      name,
      email,
      address,
      phone,
      password,
      selectedProjects,
      selectedUsers,
      errors,
    } = this.state;
    const { users, loggedUser } = this.props;
    let { projects } = this.props;
    let projectContent = "";
    let userContent = "";

    const errorsContent =
      errors.length > 0
        ? errors.map((error) => {
            return <div class="item">{error[1]}</div>;
          })
        : null;

    // show only logged user projects if is not administrator
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

    if (users) {
      let counter = 1;
      userContent = users.map((user) => {
        return (
          <div className="checkbox-item" key={counter++}>
            <input
              type="checkbox"
              name={user.name}
              value={user.name}
              onChange={this.onChangeUsersMultiCheckbox}
              checked={selectedUsers.includes(user.name)}
            />
            <div>{user.name}</div>
          </div>
        );
      });
    }

    return (
      <StyledUserForm>
        <div className="registry-form-box">
          <div class="form-errors-box">{errorsContent}</div>
          <form action="post">
            <div className="form-group form-row">
              <input
                onChange={this.onChangeInput}
                className="form-control"
                type="text"
                name="name"
                value={name}
                placeholder="Nazwa"
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
                  ? user_statuses.map((status) => {
                      if (loggedUser.status !== "Administrator") {
                        if (status.name !== "Administrator") {
                          return (
                            <option key={status._id} value={status.name}>
                              {status.name}
                            </option>
                          );
                        }
                      } else {
                        return (
                          <option key={status._id} value={status.name}>
                            {status.name}
                          </option>
                        );
                      }
                    })
                  : null}
              </select>
            </div>
            <div className="form-group form-row multi-checkboxes">
              <React.Fragment>
                <label>[Przypisz sprawę]</label>
                {projectContent}
              </React.Fragment>
            </div>
            {/* <div className="form-group form-row multi-checkboxes">
              <label>[Przypisz użytkowników]</label>
              {userContent}
            </div> */}
            <div className="form-group">
              <input
                onClick={this.registerHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledUserForm>
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

export default connect(mapStateToProps, { registerUser })(RegistryForm);
