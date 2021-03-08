import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import { addOutgoingMail } from "../actions";
import { StyledOutgoingMailForm } from "../styles/StyledOutgoingMailForm";

class OutgoingMailsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      number: "",
      recipient: "",
      city: "",
      zipcode: "",
      street: "",
      description: "",
      comment: "",
      collectionAmount: "",
      collectionAmountGr1: "",
      weight: "",
      g: "",
      transmittingNumber: "",
      declaredAmount: "",
      declaredAmountGr2: "",
      payment: "",
      paymentGr3: "",
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
      addOutgoingMail,
      loggedUser,
      closeAddFormHandler,
      outgoingMails,
    } = this.props;
    const {
      date,
      number,
      recipient,
      city,
      zipcode,
      street,
      description,
      comment,
      collectionAmount,
      collectionAmountGr1,
      weight,
      g,
      transmittingNumber,
      declaredAmount,
      declaredAmountGr2,
      payment,
      paymentGr3,
    } = this.state;

    // find biggest number

    // const biggestNumber = parseInt(outgoingMails.reduce((biggestNumber,item) => item.number > biggestNumber ? biggestNumber = item.number : biggestNumber,0))

    let biggestNumber = 0;

    outgoingMails.forEach(item => {
      let itemNumber = parseInt(item.number);
      if(itemNumber > biggestNumber){
        biggestNumber = itemNumber;
      }
    })

    const data = {
      date,
      number: (biggestNumber + 1),
      recipient,
      city,
      zipcode,
      street,
      description,
      comment,
      collectionAmount,
      collectionAmountGr1,
      weight,
      g,
      transmittingNumber,
      declaredAmount,
      declaredAmountGr2,
      payment,
      paymentGr3,
    };

    event.preventDefault();
    addOutgoingMail(data);
    closeAddFormHandler();
  };
  render() {
    const {
      number,
      date,
      recipient,
      city,
      zipcode,
      street,
      description,
      comment,
      collectionAmount,
      collectionAmountGr1,
      weight,
      g,
      transmittingNumber,
      declaredAmount,
      declaredAmountGr2,
      payment,
      paymentGr3,
    } = this.state;

    return (
      <StyledOutgoingMailForm>
        <div className="outgoing-mail-add-form-box">
          <form action="">
            {/* <TextFieldGroup
              title="Numer wpisu"
              onChange={this.onChangeInput}
              name="number"
              value={number}
              placeholder="Wprowadź nr wpisu"
            /> */}
            <TextFieldGroup
              label="Data wysłania"
              type="datetime-local"
              title="Data wysłania"
              onChange={this.onChangeInput}
              name="date"
              value={date}
              placeholder="Wprowadź datę wysłania"
            />
            <TextFieldGroup
              label="Adresat"
              title="Adresat"
              onChange={this.onChangeInput}
              name="recipient"
              value={recipient}
              placeholder="Wprowadź adresata"
            />
            <TextFieldGroup
              label="Miasto"
              type="text"
              title="Miasto"
              onChange={this.onChangeInput}
              name="city"
              value={city}
              placeholder="Wprowadź miasto"
            />
            <TextFieldGroup
              label="Kod pocztowy"
              type="text"
              title="Kod pocztowy"
              onChange={this.onChangeInput}
              name="zipcode"
              value={zipcode}
              placeholder="Wprowadź kod pocztowy"
            />
            <TextFieldGroup
            label="Ulica"
              type="text"
              title="Ulica"
              onChange={this.onChangeInput}
              name="street"
              value={street}
              placeholder="Wprowadź ulicę"
            />
            <TextFieldGroup
            label="Kwota zadekl. wartości"
              type="text"
              title="Kwota zadekl. wartości"
              onChange={this.onChangeInput}
              name="collectionAmount"
              value={collectionAmount}
              placeholder="Wprowadź kwotę zadekl. wartości"
            />
            <TextFieldGroup
              label="Gr 1"
              type="text"
              title="Gr 1"
              onChange={this.onChangeInput}
              name="collectionAmountGr1"
              value={collectionAmountGr1}
              placeholder="Wprowadź Gr 1"
            />
            <TextFieldGroup
            label="Masa kg"
              type="text"
              title="Masa kg"
              onChange={this.onChangeInput}
              name="weight"
              value={weight}
              placeholder="Wprowadź masę kg"
            />
            <TextFieldGroup
            label="G"
              type="text"
              title="G"
              onChange={this.onChangeInput}
              name="g"
              value={g}
              placeholder="Wprowadź G"
            />
            <TextFieldGroup
            label="Numer nadawczy"
              type="text"
              title="Numer nadawczy"
              onChange={this.onChangeInput}
              name="transmittingNumber"
              value={transmittingNumber}
              placeholder="Wprowadź numer nadawczy"
            />
            <TextFieldGroup
            label="Opłata"
              type="text"
              title="Opłata"
              onChange={this.onChangeInput}
              name="declaredAmount"
              value={declaredAmount}
              placeholder="Wprowadź opłatę zł"
            />
            <TextFieldGroup
            label="Gr 2"
              type="text"
              title="Gr 2"
              onChange={this.onChangeInput}
              name="declaredAmountGr2"
              value={declaredAmountGr2}
              placeholder="Wprowadź Gr 2"
            />
            <TextFieldGroup
            label="Kwota pobraniowa"
              type="text"
              title="Kwota pobraniowa"
              onChange={this.onChangeInput}
              name="payment"
              value={payment}
              placeholder="Wprowadź kwotę pobraniową"
            />
            <TextFieldGroup
            label="Gr 3"
              type="text"
              title="Gr 3"
              onChange={this.onChangeInput}
              name="paymentGr3"
              value={paymentGr3}
              placeholder="Wprowadź Gr 3"
            />
            <TextareaFieldGroup
            label="Opis"
              title="Opis"
              onChange={this.onChangeInput}
              name="description"
              value={description}
              cols="4"
              rows="6"
              placeholder="Dodaj opis"
            />
            <TextareaFieldGroup
            label="Komentarz"
              title="Komentarz"
              onChange={this.onChangeInput}
              name="comment"
              value={comment}
              cols="4"
              rows="6"
              placeholder="Dodaj komentarz"
            />
            <div className="form-group submit">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledOutgoingMailForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    outgoingMails: state.outgoingMails.outgoingMails,
  };
};

export default connect(mapStateToProps, { addOutgoingMail })(
  OutgoingMailsAddForm
);
