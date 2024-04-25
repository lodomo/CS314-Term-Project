const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // for parsing application/json

mongoose.connect("your-mongodb-uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("Hello from MERN Stack Backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
