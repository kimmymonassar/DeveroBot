import { model, Schema } from 'mongoose';

const CasesSchema = new Schema({}, { strict: false });
const Cases = model('Cases', CasesSchema, 'Cases');

export default Cases;
