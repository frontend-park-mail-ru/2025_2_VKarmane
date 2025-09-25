"use strict;";

const express = require("express");
const body = require("body-parser");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(express.static(path.resolve(__dirname, "..", "node_modules")));
app.use(body.json());
app.use(cookie());

app.get("/", (req, res) => {});

app.post("/login", (req, res) => {
  res.status(403).json({ status: "n", text: "wrong login or password" });
});

app.post("/signup", (req, res) => {
  res.status(403).json({ status: "n", text: "occupied login" });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
