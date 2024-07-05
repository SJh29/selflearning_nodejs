// requirements
// express
const express = require("express");
const path = require("path");
const cookieParse = require("cookie-parser");
require("dotenv").config({ path: "./src/.env" });

const app = express();
const port = process.env.PORT || 3000;

// viewengine
// Set Pug as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// set stylesheets & scripts for pages
app.use(express.static(path.join(__dirname + "/src/stylesheets")));
// parse json and encoded url
app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));

const router = require("./src/routes/index.routes");
app.use("/", router);

// database connect
const connectDB = require("./src/connect");
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
