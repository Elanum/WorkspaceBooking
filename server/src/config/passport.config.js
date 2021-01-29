import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users.model';

const { JWT_SECRET = 'jwtsecret' } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
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
