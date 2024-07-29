const express = require("express")
const mongoose = require("mongoose")
const next = require("next")
const User = require("./models/User")
const session = require("express-session")
const MongoStore = require("connect-mongo")

require("dotenv").config()

const port = parseInt(process.env.PORT, 10) || 3001
const ROOT_URL = `http://localhost:${port}`

const dev = process.env.NODE_ENV !== "production"

const MONGO_URL = process.env.MONGO_URL_TEST

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(MONGO_URL, options)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  /** 1. Creating session*/
  const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    /** 2. Saving session*/
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_TEST,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    /** 2. Saving session*/
    resave: false, //save session to db
    saveUninitialized: false, //save session to db
    cookie: {
      httpOnly: false,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      domain: "localhost",
    },
  }

  server.use(session(sess))
  /** 1. Creating session*/

  server.get("/", async (req, res) => {
    // const user = JSON.stringify(
    //   await User.findOne({ slug: "team-builder-book" })
    // );
    //req.session.foo = "bar"; for cookies
    const user = await User.findOne({ slug: "team-builder-book" })

    req.user = user
    app.render(req, res, "/", { user })
  })

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`>Ready on ${ROOT_URL}`)
  })
})
