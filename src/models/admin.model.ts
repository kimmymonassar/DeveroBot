import { model, Schema } from 'mongoose';

const AdminSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: null,
  },
});

const Admins = model('Admins', AdminSchema, 'Admins');

export default Admins;
