const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

// Middlewares
app.use(morgan("dev")); // logs http requests
app.use(bodyParser.json()); // parse data to proper format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Required APIs
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");
const userRoutes = require("./routes/auth");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", userRoutes);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
