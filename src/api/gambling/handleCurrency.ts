import User from '../../models/user.model';
import { logError } from '../../api/util/logUtil';

export default async function handleCurrency(
  player: any,
  amount: number,
  didWin: boolean,
  isGambling = false,
): Promise<void> {
  try {
    const username = player.username;
    if (didWin) {
      await User.findOneAndUpdate({ username }, { $inc: { currency: amount } }, { new: true });
    } else if (isGambling) {
      await User.findOneAndUpdate({ username }, { $inc: { currency: -amount } }, { new: true });
    }
  } catch (e) {
    logError(`Could not handle currency correctly for player ${player.username}`);
  }
}
