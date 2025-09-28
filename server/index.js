const express = require("express");
const path = require("path");
const body = require("body-parser");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(express.static(path.resolve(__dirname, "..", "node_modules")));
app.use(body.json());
app.use(cookie());



app.use('/dist', express.static('dist'));
app.post("/login", (req, res) => {
  res.status(403).json({ status: "n", text: "wrong login or password" });
});

app.post("/signup", (req, res) => {
  res.status(403).json({ status: "n", text: "occupied email" });
});

app.use(express.static(path.join(__dirname, "../public"))); // отдаём JS и CSS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/signup", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(3000, () => console.log("Server running"));
