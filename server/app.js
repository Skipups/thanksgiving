/*
  DO NOT CHANGE THIS FILE!
*/

const express = require("express");
const app = express();

app.use(express.json());

const peopleRoutes = require("./api/people");

app.use("/api/people", peopleRoutes);
app.use("/api/dishes", require("./api/dishes"));

app.use((err, req, res, next) => {
  if (err.status !== 500) {
    res
      .status(400)
      .send({ message: "Oops! There's an error on the server", error: err });
  } else {
    res.status(500).send(err);
  }
});

// need to do this for supertest
module.exports = { app };
