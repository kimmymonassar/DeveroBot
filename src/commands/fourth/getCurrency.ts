import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import { handleUser, handleUserTimestamp } from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class rollDice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'balance',
      aliases: ['wallet', 'money', 'currency', 'bal'],
      group: 'second',
      memberName: 'gamble',
      description: 'Get current currency',
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
      const dbUser: any = await handleUser(message);
      await handleUserTimestamp(message);
      const playerBalance = dbUser.currency;
      logSuccess(`Posted current balance for ${message.author.username}#${message.author.discriminator}`);
      return message.reply(`Your current balance is: **${playerBalance}**`);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Coudln't get currency, try again`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
