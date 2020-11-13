import Admin from '../models/admin.model';
import { logSuccess, logError } from '../api/util/logUtil';

export default async function makeUserAdmin(message: Record<string, any>) {
  try {
    const id = message.argString.match(/\d+/g).join('');

    let admin = await Admin.findOne({ id });

    if (admin) {
      return admin;
    }

    admin = new Admin({
      id,
    });

    await admin.save();

    logSuccess(`Created admin with id ${id}`);
    return admin;
  } catch (e) {
    logError(`function makeUserAdmin threw error: ${e}`);
    return null;
  }
}
