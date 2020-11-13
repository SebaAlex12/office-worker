const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  createdByUserId: {
    type: String,
    required: true,
  },
  responsiblePersonId: {
    type: String,
    required: [true, "Odpowiedzialna osoba jest wymagana"],
  },
  title: {
    type: String,
    required: [true, "Tytuł jest wymagany"],
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"],
  },
  priority: {
    type: String,
    required: [true, "Priorytet jest wymagany"],
  },
  termAt: {
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
  createdAt: {
    type: String,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
