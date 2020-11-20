import { Command } from 'discord.js-commando';
import handleUserValues from '../../api/common/commonUserFunctions';
import makeUserAdmin from '../../db/makeUserAdmin';
import { isOwner } from '../../api/util/isAdmin';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class makeAdminCommand extends Command {
  constructor(client: any) {
    super(client, {
      name: 'makeadmin',
      aliases: [],
      group: 'sixth',
      memberName: 'makeadmin',
      description: 'Owner command to make user admin',
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
      if (isOwner(message.author.id)) {
        await makeUserAdmin(message);
        return message.say('Made user admin');
      } else {
        return message.say('Only owner can use that command');
      }
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
