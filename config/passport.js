// JSon Web token strategy
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("mongoose").model("users");

const opts = {
  jwtFromRequest: require("passport-jwt").ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

module.exports = passport =>
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) =>
      User.findById(jwt_payload.id)
          .then(user => done(null, user? user : false))
          .catch(err => console.log(err))
    )
  );
