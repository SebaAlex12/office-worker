const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StageSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Opis jest wymagany"],
  },
  createdAt: {
    type: String,
    required: true,
  },
  termAt: {
    type: String,
  },
});

module.exports = Stage = mongoose.model("stage", StageSchema);
