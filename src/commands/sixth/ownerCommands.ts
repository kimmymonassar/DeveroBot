import { Command } from 'discord.js-commando';
import { handleUser } from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class ownerCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'owner',
      aliases: ['owneropencase'],
      group: 'sixth',
      memberName: 'owner',
      description: 'Owner commands',
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

      const dbUser = await handleUser(message);
      /* 
        Placeholder function for now
      */
      if (dbUser?.toObject().isOwner) {
        return message.reply(`Yep, you're listed as owner`);
      }
      return message.reply(`Sorry, you're not listed as owner`);
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
