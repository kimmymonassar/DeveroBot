import { model, Schema } from 'mongoose';

const ServerSchema = new Schema({}, { strict: false });
const Servers = model('Servers', ServerSchema, 'Servers');

export default Servers;
