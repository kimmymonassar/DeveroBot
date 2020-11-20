import { Command } from 'discord.js-commando';
import subreddits from '../../../assets/json/subreddits.json';
import { logSuccess } from '../../api/util/logUtil';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class listSubreddits extends Command {
  constructor(client: any) {
    super(client, {
      name: 'listreddits',
      aliases: ['listsubreddits'],
      group: 'first',
      memberName: 'listreddits',
      description: 'Lists subscribed subreddits.',
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
      logSuccess('Successfully listed subreddits');
      return message.say(`Currently subscribed subreddits: **${subreddits.join(', ')}**`);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
