import mongoose from 'mongoose';
import validtor from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    validate: {
      validator(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Email is not valid',
    },
  },
  firstname: {
    type: String,
    default: undefined,
  },
  lastname: {
    type: String,
    default: undefined,
  },
});

UserSchema.plugin(validtor);

UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

UserSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.set('toJSON', { virtuals: true });

UserSchema.set('id', false);

UserSchema.pre('save', async function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = mongoose.model('User', UserSchema);
