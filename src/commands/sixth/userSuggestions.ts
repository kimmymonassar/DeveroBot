import { Command } from 'discord.js-commando';
import handleUserValues from '../../api/common/commonUserFunctions';
import handleSuggestions from '../../api/common/handleUserSuggestions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class userSuggestion extends Command {
  constructor(client: any) {
    super(client, {
      name: 'suggestion',
      aliases: ['suggestions', 'feature'],
      group: 'sixth',
      memberName: 'suggestion',
      description: 'Submit your sugesstions to the developer',
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
      await handleSuggestions(message);
      return message.reply('Thank you for your suggestion');
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.reply('Something went wrong');
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
