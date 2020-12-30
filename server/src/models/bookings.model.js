import mongoose from 'mongoose';

const formatDate = (_doc, obj) => {
  if (obj && obj.date) {
    const newDate = obj.date.toISOString().slice(0, 10);
    obj.date = newDate;
  }
  return obj;
};

const BookingSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    min: new Date().toISOString().slice(0, 10),
  },
  bookedAM: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
  },
  bookedPM: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
  },
  bookedState: {
    type: Number,
    default: 0,
  },
});

BookingSchema.set('toJSON', { virtuals: true, transform: formatDate });

BookingSchema.set('id', false);

BookingSchema.pre('save', function setState(next) {
  const booking = this;

  let state = 0;
  if (booking.bookedPM) state += 1;
  if (!booking.bookedAM) state += 1;

  try {
    booking.bookedState = state;
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
