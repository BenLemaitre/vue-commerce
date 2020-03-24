const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middlewares
app.use(morgan("dev")); // logs http requests
app.use(bodyParser.json()); // parse data to proper format
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Hello app");
});

app.post("/", (req, res) => {
  console.log(req.body.name);
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
