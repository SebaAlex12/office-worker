const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IncomingMailSchema = new Schema({
  number: {
    type: String,
    required: [true, "Numer jest wymagany"],
  },
  deliveryDate: {
    type: String,
  },
  sender: {
    type: String,
    required: [true, "Nadawca jest wymagany"],
  },
  deliveryCase: {
    type: String,
    required: [true, "Sprawa jest wymagana"],
  },
  signature: {
    type: String,
    required: [true, "Sygnatura jest wymagana"],
  },
  description: {
    type: String,
  },
});

module.exports = IncomingMail = mongoose.model(
  "incomingMail",
  IncomingMailSchema
);
