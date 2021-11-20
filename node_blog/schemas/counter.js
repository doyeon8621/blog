//schema/counter.js
//글번호 생성을 위한 스키마
const mongoose = require("mongoose");

// schema
const counterSchema = mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

// model & export
module.exports = mongoose.model("Counter", counterSchema);
