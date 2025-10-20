import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import "dotenv/config";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../src/.env") });

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "dev";
const startServer = () => {
  if (ENV === "prod") {
    const key = process.env.KEY_PATH;
    const cert = process.env.FULLCHAIN_PATH;
    https.createServer({ key, cert }, app).listen(PORT, () => {
      console.log(`Server running on https://localhost:${PORT}`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
};

startServer();
