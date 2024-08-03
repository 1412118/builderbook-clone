const passport = require("passport")
const Strategy = require("passport-google-oauth").OAuth2Strategy
const User = require("./models/User")
const { verify } = require("crypto")

function setupGoogle({ server, ROOT_URL }) {
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email
    let avatarUrl

    if (profile.emails) {
      email = profile.emails[0].value
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace("sz=50", "sz=28")
    }
    try {
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      })
      verified(null, user)
    } catch (error) {
      verified(error)
      console.log(error)
    }
  }
  //1. define 'verify' method: get profile and getToken from Google
  //2. call and wait for static method 'User.signInOrSignUp' to return created or existing User MongoDB
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: `${ROOT_URL}/auth/google/callback`,
      },
      verify
    )
  )

  // 3. To allow user to stay logged in, Passport associates a session with a user by saving user.id to the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields())
      .then((user) => {
        done(null, user)
      })
      .catch((error) => {
        done(error, null)
      })
  })

  server.use(passport.initialize())
  server.use(passport.session())

  /**
   * When call "passport" method, on the server, constructs a unique URL and sends a response
   * back to the browser, telling the browser to redirect a user to this constructed URL. This
   * constructed URL is a login page hosted by Google. On this page, a user selects a Google
   * account and confirms intent to log in with that Google account
   */
  server.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account",
    })
  )

  /**
   * After Google's server authenticates a user, Google's server sends a response to the user's
   * browser. The response contains a redirect directive to redirect to the /oauth2callback route.
   * Once a user's browser loads the /oauth2callback route, the browser sends a request to our
   * server. Inside the Express route /oauth2callback, we, as per the "passport" docs, simply
   * call passport.authenticate again but with different arguments. The first argument is still
   * 'google', the second argument object contains a "failureRedirect" property, and the third
   * argument is a handler function that, this time, explicitly sends a response back to the
   * browser
   */
  server.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
    }),
    (_, res) => {
      res.redirect("/")
    }
  )

  /**
   * When called the req.logout method sets the req.user property to null and removes the
   * user property from the corresponding session object
   */
  server.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        next(err)
      }
      res.redirect("/login")
    })
  })
}

module.exports = setupGoogle
