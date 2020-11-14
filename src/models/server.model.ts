import { model, Schema } from 'mongoose';

const ServerSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  maximumMembers: {
    type: Number,
    default: 0,
  },
  joinedTimestamp: {
    type: String,
    default: 0,
  },
  ownerId: {
    type: String,
    default: '',
  },
  premiumTier: {
    type: Number,
    default: 0,
  },
  large: {
    type: String,
    default: 'false',
  },
});

const Servers = model('Servers', ServerSchema, 'Servers');

export default Servers;
