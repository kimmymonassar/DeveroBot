import User from '../models/user.model';
import { logError } from './logUtil';

export default async function handleCurrency(player: any, amount: number, didWin: boolean): Promise<void> {
  try {
    const username = player.username;
    if (didWin) {
      await User.findOneAndUpdate({ username }, { $inc: { currency: amount + amount } });
    } else {
      await User.findOneAndUpdate({ username }, { $inc: { currency: -amount } });
    }
  } catch (e) {
    logError(`Could not handle currency correctly for player ${player.username}`);
  }
}
