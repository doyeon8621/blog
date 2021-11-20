//router/writing.js
const express = require("express");
const Writings = require("../schemas/writing");
let router = express.Router();
//글 전체 목록보기
router.get("/list", async (req, res, next) => {
  try {
    const writing = await Writings.find({}).sort("-date");
    res.json({ writing: writing });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
//글 상세보기
router.get("/list/:writingId", async (req, res) => {
  const { writingId } = req.params;
  writing = await Writings.findOne({ writingId: writingId });
  res.json({ detail: writing });
});
//글쓰기
router.post("/write", async (req, res) => {
  const { writingId, title, writer, date, content, password } = req.body;

  await Writings.create({
    writingId,
    title,
    writer,
    date,
    content,
    password,
  });

  res.send({ result: "success" });
});
//글수정
router.patch("/update/:writingId/set", async (req, res) => {
  const { writingId } = req.params;
  const { title, content, date } = req.body;

  let isWritingin = await Writings.findOne({ writingId });
  isWritingin.title = title;
  isWritingin.content = content;
  isWritingin.date = date;
  isWritingin.save();
  res.send({ result: "success" });
});
//글삭제
router.delete("/update/:writingId/delete", async (req, res) => {
  const { writingId } = req.params;

  const isWritingin = await Writings.find({ writingId });
  if (isWritingin.length > 0) {
    await Writings.deleteOne({ writingId });
  }

  res.send({ result: "success" });
});

module.exports = router;
