import { model, Schema } from 'mongoose';

const ErrorSchema = new Schema({}, { strict: false });
const Error = model('ErrorMessages', ErrorSchema, 'ErrorMessages');

export default Error;
