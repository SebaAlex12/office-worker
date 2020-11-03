const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Tytuł jest wymagany"],
  },
  projectName: {
    type: String,
    // required: [true, "Nazwa projektu jest wymagana"],
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"],
  },
  priority: {
    type: String,
    required: [true, "Priorytet jest wymagany"],
  },
  createdBy: {
    type: String,
    required: true,
  },
  responsiblePerson: {
    type: String,
    required: [true, "Odpowiedzialna osoba jest wymagana"],
  },
  termAt: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  description: {
    type: String,
  },
  responsiblePersonLastComment: {
    type: String,
  },
  finishedAt: {
    type: String,
  },
  mailRemainderData: {
    type: String,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
