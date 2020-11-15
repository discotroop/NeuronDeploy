const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const daily = require("./Daily");

// Server URL from secret
const db =
  "mongodb+srv://Neuron:X5gDSJt7ZqKnwsQ@cluster0.wr71s.mongodb.net/Neuron?retryWrites=true&w=majority";
// process.env.MONGO_URI;

const apiRouter = require("./routes/apiRouter");

const app = express();
const apiPort = process.env.PORT || 8000;

// Parser and cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Connect DB with mongoose.
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(res => console.log("success, connnected to db"))
  .catch(err => console.log(err));

// pull in client from the build folder
app.use(express.static(path.join(__dirname, "/client/build")));
// if a call goes to api use api router
app.use("/api", apiRouter);
// else use the client from the build folder.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;
