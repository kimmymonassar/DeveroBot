import { handleUser } from '../common/commonUserFunctions';
import { logSuccess } from './logUtil';

export default async function spamProtection(message: Record<string, any>) {
  const now = new Date().getTime();
  const dbUser = await handleUser(message);
  const userObject = dbUser?.toObject();
  const numberOfViolations = userObject.spamViolations;
  const lastMsgSent: any = new Date(userObject.lastMsgTimestamp).getTime();

  const COOLDOWN_PERIOD = 5000;
  const checkDiff = (a: number, b: number) => {
    return Math.abs(a - b) > COOLDOWN_PERIOD;
  };

  if (!checkDiff(now, lastMsgSent)) {
    dbUser?.updateOne({ spamViolations: numberOfViolations + 1 }).exec();
    logSuccess(`Spam violation has been added for user: ${userObject.username}`);
    return true;
  }

  return false;
}
