import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users';

const secret = process.env.SECRET || 'jwtsecret';
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const authorize = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false, { message: 'User not found' });
        })
        .catch((error) => done(error));
    }),
  );
};

module.exports = authorize;
