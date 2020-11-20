import { Command } from 'discord.js-commando';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class adminCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'admin',
      aliases: [],
      group: 'sixth',
      memberName: 'admin',
      description: 'Admin commands',
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

      return message.reply('Not implemented yet');
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
