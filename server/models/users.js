import mongoose from 'mongoose';

const UserShema = new mongoose.Schema({
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
    minlength: 1, // TODO: Bigger Length
    select: false,
  },
});

export default UserShema;
