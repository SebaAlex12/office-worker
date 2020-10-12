const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nazwa sprawy jest wymagana"],
  },
  signature: {
    type: String,
    required: [true, "Sygnatura jest wymagana"],
  },
  type: {
    type: String,
    required: [true, "Typ jest wymagany"],
  },
  organ: {
    type: String,
    required: [true, "Organ jest wymagany"],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
  termAt: {
    type: String,
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
