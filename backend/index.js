require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./src/db/db");

const trip = require("./src/routers/trip");
const request = require("./src/routers/request");
const authRoute = require("./src/routers/auth");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", trip);
app.use("/api", request);
app.use("/auth", authRoute);
// app.use("/auth", register);
// app.use("/auth", login);

app.listen(5010, () => {
  console.log("server has started on port 5010");
});

module.exports = app;
