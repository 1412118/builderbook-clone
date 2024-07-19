const passport = require("passport");
const Strategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/User");
const { verify } = require("crypto");

export default function setupGoogle({ ROOT_URL, server }) {
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.emails[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace("sz=50", "sz=28");
    }
    try {
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      verified(null, user);
    } catch (error) {
      verified(error);
      console.log(error);
    }
  };
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
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields())
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });

  server.use(passport.initialize());
  server.use(passport.session());
}
