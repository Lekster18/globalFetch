const express = require("express");
const cors = require("cors");
const pool = require("./src/db/db");

const trip = require("./src/routers/trip");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", trip);

app.listen(5010, () => {
  console.log("server has started on port 5010");
});

module.exports = app;
