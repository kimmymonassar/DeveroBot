import User from '../models/user.model';
import { logSuccess, logError } from '../api/logUtil';
export default async function createOrGetUser(username: string) {
  try {
    let user = await User.findOne({ username });

    if (user) {
      return user;
    }

    user = new User({
      username,
    });
    await user.save();

    logSuccess(`Created user ${username}`);
    return user;
  } catch (e) {
    logError(`function createUser threw error: ${e}`);
    return null;
  }
}
