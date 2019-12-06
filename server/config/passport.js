const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Patient = mongoose.model('patients');
const Doctor = mongoose.model('doctors');
const tokenKey = process.env.SECRET_OR_KEY;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      let currentUser = await Patient.findById(jwt_payload.id);
      if (currentUser) return done(null, currentUser);
      currentUser = await Doctor.findById(jwt_payload.id);
      if (currentUser) return done(null, currentUser);
      return done(null, false);
    })
  );
};
