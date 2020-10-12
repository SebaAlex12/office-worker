import React, { Component } from "react";
import { connect } from "react-redux";

import { addMail } from "../actions";

import { StyledMailAddForm } from "../styles/StyledMailAddForm";
// import FilesAddForm from "../../Files/components/FilesAddForm";

class MailsAddForm extends Component {
  constructor(props) {
    super(props);
    const { loggedUser, to, title, projectName } = this.props;

    this.state = {
      from: loggedUser.email,
      to,
      projectName,
      title,
      description: "",
      absolutePathFile: "",
      attachments: "",
      createdBy: loggedUser.name
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  sendHandler = event => {
    const { addMail } = this.props;
    const {
      from,
      to,
      projectName,
      title,
      description,
      absolutePathFile,
      attachments,
      createdBy
    } = this.state;

    const data = {
      from,
      to,
      projectName,
      title,
      description,
      absolutePathFile,
      attachments,
      createdBy
    };

    event.preventDefault();

    addMail(data);
  };
  render() {
    const {
      from,
      to,
      projectName,
      title,
      description,
      absolutePathFile
      // attachments
    } = this.state;

    const { projects } = this.props;

    return (
      <StyledMailAddForm>
        <div className="mail-add-form-box">
          <form action="">
            <div className="form-group">
              <label>Adres nadawcy:</label>
              <input
                onChange={this.onChangeInput}
                value={from}
                type="text"
                name="from"
                className="form-control"
                placeholder="Adres nadawcy"
                title="Adres nadawcy"
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label>Nazwa projektu:</label>
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="projectName"
                required
              >
                <option value=""></option>
                {projects
                  ? projects.map(project => {
                      let option = "";
                      option = (
                        <option
                          key={project._id}
                          value={project.name}
                          selected={
                            project.name === projectName ? "selected" : null
                          }
                        >
                          {project.name}
                        </option>
                      );
                      return option;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <label>Adresy odbiorców:</label>
              <textarea
                onChange={this.onChangeInput}
                value={to}
                type="text"
                name="to"
                className="form-control"
                placeholder="Adresy odbiorców"
                title="Adresy odbiorców"
                required
              />
            </div>
            {/* <div className="form-group">
              <label>Nazwa projektu:</label>
              <input
                onChange={this.onChangeInput}
                value={projectName}
                type="text"
                name="projectName"
                className="form-control"
                placeholder="Dotyczy projektu"
                title="Dotyczy projektu"
                required
              />
            </div> */}
            <div className="form-group">
              <label>Tytuł:</label>
              <textarea
                onChange={this.onChangeInput}
                value={title}
                type="text"
                name="title"
                className="form-control"
                placeholder="Tytuł"
                title="Tytuł"
              />
            </div>
            <div className="form-group">
              <label>Ścieżka do pliku:</label>
              <input
                onChange={this.onChangeInput}
                value={absolutePathFile}
                type="text"
                name="absolutePathFile"
                className="form-control"
                placeholder="Ścieżka do pliku"
                title="Ścieżka do pliku"
              />
            </div>
            <div className="form-group">
              <label>Załączniki - nie działa na heroku:</label>
              <input
                onChange={this.onChangeInput}
                id="mail-file-select"
                type="file"
                // value={attachments}
                name="files[]"
                className="form-control"
                multiple
              />
            </div>
            <div className="form-group">
              <label>Opis:</label>
              <textarea
                onChange={this.onChangeInput}
                value={description}
                type="text"
                name="description"
                className="form-control"
                placeholder="Opis"
                title="Opis"
              />
            </div>
            <div className="form-group">
              <input
                onClick={this.sendHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="wyślij"
              />
            </div>
          </form>
        </div>
      </StyledMailAddForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps, { addMail })(MailsAddForm);
