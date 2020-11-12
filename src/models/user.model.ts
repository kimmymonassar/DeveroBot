import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  currency: {
    type: Number,
    required: true,
    default: 20000,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isOwner: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Users = model('Users', UserSchema, 'Users');

export default Users;
