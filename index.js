// requirements
// express
const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// viewengine
// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// parse json and encoded url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.routes");
const crudRoutes = require("./routes/crud.routes");
app.use("/crud", crudRoutes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);

const connectDB = require("./connect");
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
