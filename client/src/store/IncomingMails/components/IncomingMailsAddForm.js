import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import { addIncomingMail } from "../actions";
import { StyledIncomingMailForm } from "../styles/StyledIncomingMailForm";

class IncomingMailsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
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
    const { addIncomingMail, loggedUser } = this.props;
    const {
      number,
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    } = this.state;

    const data = {
      number,
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    };

    event.preventDefault();
    addIncomingMail(data);
  };
  render() {
    const {
      number,
      deliveryDate,
      sender,
      deliveryCase,
      signature,
      description,
    } = this.state;

    // let types = [];
    // projectTypes.forEach((item) => {
    //   types.push(item.name);
    // });

    // console.log("types", types);

    return (
      <StyledIncomingMailForm>
        <div className="project-add-form-box">
          <form action="">
            <TextFieldGroup
              title="Numer wpisu"
              onChange={this.onChangeInput}
              name="number"
              value={number}
              placeholder="Wprowadź nr wpisu"
            />
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
            <TextareaFieldGroup
              title="Opis"
              onChange={this.onChangeInput}
              name="description"
              value={description}
              cols="4"
              rows="6"
              placeholder="Dodaj opis"
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
      </StyledIncomingMailForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, { addIncomingMail })(
  IncomingMailsAddForm
);
