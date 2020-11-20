import { Command } from 'discord.js-commando';
import getRedditPost from '../../api/redditApi/getRedditPost';
import { logSuccess } from '../../api/util/logUtil';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

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

  async onError(): Promise<any> {
    throw new CommandoError('discord.js-commando error');
  }

  async run(message: Record<string, any>) {
    try {
      const isSpam = await spamProtection(message);
      if (isSpam) {
        throw new SpamError(`User: ${message.author.username}#${message.author.discriminator} spammed`);
      }

      await handleUserValues(message);
      const argsFromMsg = message.argString.trim();
      const msg = await getRedditPost(argsFromMsg);
      logSuccess(`Successfully sent meme`);

      return message.say(msg);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say('Sorry, coudlnt fetch reddit post,  try again later');
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
