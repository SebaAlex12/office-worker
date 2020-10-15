import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import { addProject } from "../actions";
import { updateUser } from "../../Users/actions";
import { StyledProjectForm } from "../styles/StyledProjectForm";
import { projectTypes } from "../../ini";

class ProjectsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      signature: "",
      type: "",
      organ: "",
      description: "",
      createdAt: "",
      termAt: "",
      userName: "",
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
  addHandler = (event) => {
    const { addProject, updateUser, users } = this.props;
    const {
      name,
      signature,
      type,
      organ,
      description,
      createdAt,
      termAt,
      userName,
    } = this.state;

    const projectData = {
      name,
      signature,
      type,
      organ,
      description,
      createdAt,
      termAt,
    };

    event.preventDefault();

    addProject(projectData);

    const userData = users.filter((user) => {
      if (user.name === userName) {
        let projects = user.projects ? user.projects.split(",") : [];
        projects.push(projectData.name);
        user.projects = projects;
        return user;
      }
    });
    updateUser(userData[0]);
  };
  render() {
    const { name, signature, organ, description, termAt } = this.state;
    const { users } = this.props;

    return (
      <StyledProjectForm>
        <div className="project-add-form-box">
          <form action="">
            <TextFieldGroup
              title="nazwa"
              onChange={this.onChangeInput}
              name="name"
              value={name}
              placeholder="Wprowadź nazwę"
            />
            <TextFieldGroup
              title="sygnatura"
              onChange={this.onChangeInput}
              name="signature"
              value={signature}
              placeholder="Wprowadź sygnaturę"
            />
            <SelectFieldGroup
              name="type"
              items={projectTypes}
              onChange={this.onChangeSelect}
              defaultName="Wybierz rodzaj"
            />
            <SelectFieldGroup
              name="userName"
              items={users}
              onChange={this.onChangeSelect}
              defaultName="Wybierz użytkownika"
            />
            <TextFieldGroup
              title="organ"
              onChange={this.onChangeInput}
              name="organ"
              value={organ}
              placeholder="Wybierz organ"
            />
            <TextareaFieldGroup
              title="Opis"
              onChange={this.onChangeInput}
              name="description"
              value={description}
              cols="4"
              rows="6"
              placeholder="Dodaj opis"
            />
            <TextFieldGroup
              type="datetime-local"
              title="Najbliższy termin rozprawy"
              onChange={this.onChangeInput}
              name="termAt"
              value={termAt}
              placeholder="Wybierz najbliższy termin rozprawy"
            />
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledProjectForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { addProject, updateUser })(
  ProjectsAddForm
);
