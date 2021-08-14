const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  chat: { type: Schema.ObjectId, required: true, ref: "Chat" },
  user: { type: Schema.ObjectId, required: true, ref: "User" },
  message: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
});

const model = mongoose.model("Message", mySchema);
module.exports = model;
