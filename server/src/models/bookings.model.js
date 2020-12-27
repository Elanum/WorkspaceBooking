import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    enum: ['am', 'pm', 'day'],
  },
});

BookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });

BookingSchema.set('toJSON', { virtuals: true, transform: formatDate });

BookingSchema.set('id', false);

module.exports = mongoose.model('Booking', BookingSchema);
