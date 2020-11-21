import { model, Schema } from 'mongoose';

const FeatureSchema = new Schema({
  nanoid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  feature: {
    type: String,
    minlength: 1,
  },
});

const Feature = model('Feature', FeatureSchema, 'Feature');

export default Feature;
