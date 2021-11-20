//페이지 셋 전체 리스트, 상세보기, 쓰기(수정)
const express = require("express");
const app = express();
const port = 3000;
//mongoose연결할 스키마
const connect = require("./schemas");
connect();
//글 api용 router객체 설정
const writingRouter = require("./router/writing");
//json으로 데이터를 가공해 주는 미들웨어
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//기본제공 미들웨어 static (정적자산)
app.use(express.static("public"));
//ejs템플릿 엔진 사용
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//router 객체 사용
app.use("/api", [writingRouter]);

//메인 페이지 글 목록 전체
app.get("/", (req, res) => {
  res.render("index");
});
//글 상세 조회하기
app.get("/detail", (req, res) => {
  res.render("detail");
});
//글 수정하기
app.get("/update", (req, res) => {
  res.render("update");
});
//글 쓰기
app.get("/write", (req, res) => {
  res.render("write");
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
