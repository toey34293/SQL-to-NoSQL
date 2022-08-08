const mongoose = require("mongoose");

const Model1 = new mongoose.Schema({
  id: { type: Number },
  user_id: { type: Number },
  content: String,
  date_time: { type: Date },
  Edit_date: { type: Date },
});

module.exports = mongoose.model("Model1", Model1, "TestNoSQL");
