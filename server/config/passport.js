import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users';

const secret = process.env.SECRET || 'jwtsecret';
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

module.exports = (passport) => {
  passport.use(new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
            if (user) return done(null, { id: user.id, username: user.username });
            return done(null, false);
        })
        .catch((error) => console.error(error.message));
  }));
};
