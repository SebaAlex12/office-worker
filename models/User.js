const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nazwa jest wymagana"],
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"],
  },
  company: {
    type: String,
  },
  projects: {
    type: String,
  },
  users: {
    type: String,
  },
  lastActive: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
