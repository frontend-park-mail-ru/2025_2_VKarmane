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


const port = process.env.PORT || 3000;



app.use('/dist', express.static('dist'));


app.use(express.static(path.join(__dirname, "../public"))); // отдаём JS и CSS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => console.log("Server running"));
