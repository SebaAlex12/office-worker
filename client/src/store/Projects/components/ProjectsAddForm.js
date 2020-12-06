import React, { Component } from "react";
import { connect } from "react-redux";

import { formValidator } from "../../../common/tools";
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
      signature: [],
      type: "",
      organ: [],
      description: "",
      createdAt: "",
      termAt: "",
      userName: "",
      validation: [
        {
          name: "name",
          required: [true, "Nazwa sprawy jest wymagana"],
          // minLength: [8, "Minimalna wymagana liczba w nazwie"],
        },
        {
          name: "type",
          required: [true, "Rodzaj sprawy jest wymagany"],
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
  addHandler = async (event) => {
    const { addProject, updateUser, users, closeAddFormHandler } = this.props;
    const {
      name,
      signature,
      type,
      organ,
      description,
      createdAt,
      termAt,
      userName,
      validation,
    } = this.state;

    let errors = [];

    const projectData = {
      name,
      signature:
        signature.length > 0
          ? [
              {
                id: 1,
                name: signature,
              },
            ]
          : [],
      organ:
        organ.length > 0
          ? [
              {
                id: 1,
                name: organ,
              },
            ]
          : [],
      type,
      description,
      createdAt,
      termAt,
    };

    event.preventDefault();

    validation.forEach((val) => {
      let result = formValidator(projectData[val.name], val);
      if (result[0] === false) errors.push(result);
    });

    this.setState({
      errors: errors,
    });

    const response = await addProject(projectData);

    if (errors.length === 0) {
      closeAddFormHandler();
    }

    if (userName.length > 0 && response) {
      const userData = users.filter((user) => {
        if (user.name === userName) {
          let projects = user.projects ? user.projects.split(",") : [];
          projects.push(projectData.name);
          user.projects = projects;
          return user;
        }
      });
      updateUser(userData[0]);
    }
  };
  render() {
    const { name, signature, organ, description, errors } = this.state;
    const { users } = this.props;

    const errorsContent =
      errors.length > 0
        ? errors.map((error) => {
            return <div class="item">{error[1]}</div>;
          })
        : null;

    return (
      <StyledProjectForm>
        <div className="project-add-form-box">
          <div class="form-errors-box">{errorsContent}</div>
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
            {/* <TextFieldGroup
              type="datetime-local"
              title="Najbliższy termin rozprawy"
              onChange={this.onChangeInput}
              name="termAt"
              value={termAt}
              placeholder="Wybierz najbliższy termin rozprawy"
            /> */}
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
