const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  let expire = new Date();
  expire.setMinutes(expire.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

  res.writeHead(200, {
    "Set-Cookie": `name=sparta; Expires=${expire.toGMTString()}; HttpOnly; Path=/`,
  });
  return res.status(200).end();
});

app.get("/get-cookie", (req, res) => {
  //   const cookie = req.headers.cookie;
  const cookies = req.cookies; // cookieParser 미들웨어를 통해 사용할 수 있다
  console.log(cookies); // name=sparta
  return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 자물쇠(데이터를 저장할 부분)
let session = {};
app.get("/set-session", (req, res) => {
  const name = "sparta"; // 세션에 저장할 데이터
  const uniqueInt = Date.now(); // 열쇠(현재 시간을 0.00초 수준으로 부여한다)
  session[uniqueInt] = name; // 세션에 데이터를 저장한다
  // uniqueInt 라는 값을 받으면 name의 value 값을 반환한다는 뜻
  res.cookie("sessionKey", uniqueInt);
  res.status(200).end();
});

app.get("/get-session", (req, res) => {
  const { sessionKey } = req.cookies;
  const sessionItem = session[sessionKey]; // session 이라는 자물쇠를 key 로 연다

  console.log(sessionItem);
  return res.status(200).json({ sessionItem: sessionItem });
});
app.listen(5002, () => {
  console.log(5002, "포트로 서버가 실행되었습니다.");
});
