import User from '../models/user.model';
import { logSuccess, logError } from '../api/util/logUtil';

export default async function updateUserTimestamp(message: Record<string, any>, lastMsgTimestamp: number) {
  try {
    const username = `${message.author.username}#${message.author.discriminator}`;

    const success = await User.findOneAndUpdate({ username }, { $set: { lastMsgTimestamp } }, { new: true }, (err) => {
      if (err) {
        logError(`Could'nt update last message timestamp for: ${username}`);
      }
    });

    if (success) {
      await success.save();
      logSuccess(`Updated last message timestamp for ${username} with value ${lastMsgTimestamp}`);
      return success;
    }

    throw new Error();
  } catch (e) {
    logError(`function updateUserTimestamp threw error: ${e}`);
    return null;
  }
}
