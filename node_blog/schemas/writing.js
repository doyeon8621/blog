//schema/writing.js
const mongoose = require("mongoose");
const Counter = require("./counter");
const { Schema } = mongoose;

const writingSchema = new Schema({
  writingId: {
    type: Number, //글번호
  },
  writer: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

//글번호를 자동생성해 주는 거
//pre로 하면 위에거 이전에 동작한다는 모양.
writingSchema.pre("save", async function (next) {
  let post = this;
  if (post.isNew) {
    let counter = await Counter.findOne({ name: "posts" }).exec();
    if (!counter) counter = await Counter.create({ name: "posts" });
    counter.count++;
    counter.save();
    post.writingId = counter.count;
  }
  return next();
});

module.exports = mongoose.model("Writing", writingSchema);
