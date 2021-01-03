import mongoose from 'mongoose';
import validtor from 'mongoose-unique-validator';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
  },
});

RoomSchema.plugin(validtor);

RoomSchema.plugin(AutoIncrement, { inc_field: 'roomId' });

RoomSchema.virtual('workspaces', {
  ref: 'Workspace',
  localField: '_id',
  foreignField: 'room',
});

RoomSchema.set('toJSON', { virtuals: true });

RoomSchema.set('id', false);

module.exports = mongoose.model('Room', RoomSchema);
