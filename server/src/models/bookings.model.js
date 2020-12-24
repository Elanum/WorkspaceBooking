import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

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
    enum: ['day', 'am', 'pm'],
    required: true,
  },
});

BookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });

BookingSchema.set('toJSON', { virtuals: true });

BookingSchema.set('id', false);

module.exports = mongoose.model('Booking', BookingSchema);
