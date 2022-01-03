const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  lastStageId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Nazwa sprawy jest wymagana"],
  },
  type: {
    type: String,
    required: [true, "Rodzaj sprawy jest wymagany"],
  },
  status: {
    type: String,
  },
  signature: {
    type: String,
  },
  organ: {
    type: String,
  },
  description: {
    type: String,
  },
  lastStageDescription: {
    type: String,
  },
  lastStageCreatedAt: {
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
