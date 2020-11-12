import User from '../models/user.model';
import { isOwner } from '../api/isAdmin';
import { logSuccess, logError } from '../api/logUtil';
export default async function createOrGetUser(message: Record<string, any>) {
  try {
    const username = `${message.author.username}#${message.author.discriminator}`;

    let user = await User.findOne({ username });
    if (user) {
      return user;
    }

    user = new User({
      username,
      isOwner: isOwner(message.author.id),
    });
    await user.save();

    logSuccess(`Created user ${username}`);
    return user;
  } catch (e) {
    logError(`function createUser threw error: ${e}`);
    return null;
  }
}
