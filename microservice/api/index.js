const express = require("express");

const bodyParse = require("body-parser");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const app = express();

app.use(bodyParse.json());
app.use("/api/user", user);
app.use("/api/auth", auth);

app.listen(config.api.port, () => {
  console.log("Api", config.api.port);
});
