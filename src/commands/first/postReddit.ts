import { Command } from 'discord.js-commando';
import getRedditPost from '../../api/redditApi/getRedditPost';
import { logSuccess, logError } from '../../api/util/logUtil';
import createOrGetUser from '../../db/createOrGetUser';

export default class getMemePost extends Command {
  constructor(client: any) {
    super(client, {
      name: 'postmeme',
      aliases: ['meme'],
      group: 'first',
      memberName: 'postmeme',
      description: 'Posts reddit meme.',
    });
  }

  async run(message: Record<string, any>) {
    try {
      await createOrGetUser(message);
      const argsFromMsg = message.argString.trim();
      const msg = await getRedditPost(argsFromMsg);
      logSuccess(`Successfully sent meme`);
      return message.say(msg);
    } catch (e) {
      logError(`Error from postReddit.js: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
