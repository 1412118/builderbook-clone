const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const User = require("./models/User");

require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3001;
const ROOT_URL = `http://localhost:${port}`;

const dev = process.env.NODE_ENV !== "production";

const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/", async (req, res) => {
    //return res.send("My express server");]
    //const user = JSON.stringify({ email: "datdt44@gmail.com" });
    const user = JSON.stringify(
      await User.findOne({ slug: "team-builder-book" })
    );
    //console.log(user);
    app.render(req, res, "/", { user });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>Ready on ${ROOT_URL}`);
  });
});
