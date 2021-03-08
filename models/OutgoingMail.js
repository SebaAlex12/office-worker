const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OutgoingMailSchema = new Schema({
    number: {
    type: String,
    required: [true, "Numer jest wymagany"],
  },
  date:{
    type: String,
    required: [true, "Data jest wymagana"],
  },
  recipient: {
    type: String,
    required: [true, "Adresat jest wymagany"],
  },
  city: {
      type: String,
      required: [true, "Miasto jest wymagane"]
  },
  zipcode: {
      type: String,
      required: [true, "Kod pocztowy jest wymagany"]
  },
  street: {
      type: String,
      required: [true, "Ulica jest wymagana"]
  },
  description: {
    type: String,
  },
  comment:{
      type: String,
  },
  collectionAmount:{
      type: String
    },
    collectionAmountGr1:{
        type: String
    },
    weight:{
        type:String
    },
    g:{
        type:String
    },
    transmittingNumber:{
        type: String
    },
    declaredAmount:{
        type: String
    },
    declaredAmountGr2:{
        type:String
    },
    payment:{
        type: String
    },
    paymentGr3:{
        type:String
    },
});

module.exports = OutgoingMail = mongoose.model(
  "outgoingMail",
  OutgoingMailSchema
);
