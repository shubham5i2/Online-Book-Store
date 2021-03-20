const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "No user with this email" });
        }
        //compare user entered password with password saved in database
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in successfully" });
            }
            return done(null, false, { message: "Wrong username or password" });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong" });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    //store user id in session to check if user is logged in or not
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
