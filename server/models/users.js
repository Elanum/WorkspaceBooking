import mongoose from 'mongoose';
import validtor from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import autoIncrementModelId from './counter';

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    min: 1,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

UserSchema.plugin(validtor);

UserSchema.set('toJSON', {
  transform: (_, obj) => {
    delete obj.__v;
    delete obj._id;
    return obj;
  },
});

UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.isNew) {
    return next();
  }

  autoIncrementModelId('users', this, next);

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt
    .genSalt(12)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = mongoose.model('User', UserSchema);
