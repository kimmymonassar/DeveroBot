import Feature from '../../models/feature.model';
import { nanoid } from 'nanoid';
import { logError } from '../util/logUtil';

export default async function handleSuggestions(message: Record<string, any>) {
  const username = `${message.author.username}#${message.author.discriminator}`;
  const argsFromMsg = message.argString.trim();
  try {
    await Feature.findOneAndUpdate(
      { nanoid: nanoid() },
      {
        $set: { username, feature: argsFromMsg },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch (e) {
    logError(`handleSuggestions threw error: ${e}`);
  }
}
