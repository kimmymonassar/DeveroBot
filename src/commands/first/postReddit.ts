import { Command } from 'discord.js-commando';
import getRedditPost from '../../api/getRedditPost';
import { logSuccess, logError } from '../../api/logUtil';
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

  async run(message: any) {
    try {
      const userId = `${message.author.username}#${message.author.discriminator}`;
      await createOrGetUser(userId);
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
