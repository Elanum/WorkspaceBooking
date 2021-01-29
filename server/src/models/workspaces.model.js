import mongoose from 'mongoose';
import validator from 'mongoose-unique-validator';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: true,
  },
});

WorkspaceSchema.plugin(validator);

WorkspaceSchema.plugin(AutoIncrement, { inc_field: 'workspaceId' });

WorkspaceSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'workspace',
});

WorkspaceSchema.set('toJSON', { virtuals: true });

WorkspaceSchema.set('id', false);

export default mongoose.model('Workspace', WorkspaceSchema);
