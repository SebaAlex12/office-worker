import React, { Component } from "react";
import { connect } from "react-redux";

import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import { addIncomingMail } from "../actions";
import { StyledIncomingMailForm } from "../styles/StyledIncomingMailForm";
import { func } from "prop-types";

class IncomingMailsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryDate: "",
      sender: "",
      deliveryCase: "",
      signature: "",
      description: "",
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
    const {
      addIncomingMail,
      loggedUser,
      closeAddFormHandler,
      incomingMails,
    } = this.props;
    const {
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    } = this.state;

    // find biggest number

    // const biggestNumber = parseInt(incomingMails.reduce((biggestNumber,item) => item.number > biggestNumber ? biggestNumber = item.number : biggestNumber,0))

    let biggestNumber = 0;

    incomingMails.forEach(item => {
      let itemNumber = parseInt(item.number);
      if(itemNumber > biggestNumber){
        biggestNumber = itemNumber;
      }
    })

    const data = {
      number: (biggestNumber + 1),
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    };

    event.preventDefault();
    addIncomingMail(data);
    closeAddFormHandler();
  };
  projectOnChangeHandler = (event) => {
    this.setState({
      deliveryCase: event.currentTarget.value,
    });
  };
  render() {
    const { projects } = this.props;
    const {
      number,
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    } = this.state;

    return (
      <StyledIncomingMailForm>
        <div className="project-add-form-box">
          <form action="">
            {/* <TextFieldGroup
              title="Numer wpisu"
              onChange={this.onChangeInput}
              name="number"
              value={number}
              placeholder="Wprowadź nr wpisu"
            /> */}
            <TextFieldGroup
              label="Data doręczenia"
              type="datetime-local"
              title="Data doręczenia"
              onChange={this.onChangeInput}
              name="deliveryDate"
              value={deliveryDate}
              placeholder="Wprowadź datę doręczenia"
            />
            <TextFieldGroup
              title="Nadawca"
              onChange={this.onChangeInput}
              name="sender"
              value={sender}
              placeholder="Wprowadź nadawcę"
            />
            <label>Wybierz z listy sprawę</label>
            <SelectFieldGroup
              items={projects}
              onChange={(event) => this.projectOnChangeHandler(event)}
            />
            <label>lub wpisz ręcznie</label>
            <TextFieldGroup
              title="Sprawa"
              onChange={this.onChangeInput}
              name="deliveryCase"
              value={deliveryCase}
              placeholder="Wprowadź sprawę"
            />
            <TextFieldGroup
              type="text"
              title="Sygnatura"
              onChange={this.onChangeInput}
              name="signature"
              value={signature}
              placeholder="Wprowadź sygnaturę"
            />
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
            <TextareaFieldGroup
              title="Opis"
              onChange={this.onChangeInput}
              name="description"
              value={description}
              cols="4"
              rows="6"
              placeholder="Dodaj opis"
            />
          </form>
        </div>
      </StyledIncomingMailForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects,
    incomingMails: state.incomingMails.incomingMails,
  };
};

export default connect(mapStateToProps, { addIncomingMail })(
  IncomingMailsAddForm
);
