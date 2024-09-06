// requirements
// express
const express = require("express");
const path = require("path");
const cookieParse = require("cookie-parser");
require("dotenv").config({ path: "./src/.env" });
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// logger
app.use(morgan("dev"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

// parse json and encoded url
app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));

// viewengine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// set stylesheets & scripts for pages
app.use(express.static(path.join(__dirname + "/src/stylesheets")));

const router = require("./src/routes/index.routes");
app.use("/", router);

// database connect
const connectDB = require("./src/connect");
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
