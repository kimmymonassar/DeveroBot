import spamProtection from '../../api/util/spamProtection';
import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import { handleUserTimestamp, handleUser } from '../../api/common/commonUserFunctions';
import rollDiceGame from '../../api/gambling/rollDiceGame';
import handleCurrency from '../../api/gambling/handleCurrency';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class rollDice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'beg',
      aliases: ['moneypls'],
      group: 'second',
      memberName: 'beg',
      description: 'Begs for currency',
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
      await handleUserTimestamp(message);
      const dbUser: any = await handleUser(message);
      const result = await rollDiceGame();
      const didWin = result.player > result.cpu;

      if (didWin) {
        await handleCurrency(dbUser, 500, didWin);
        logSuccess(`Gave ${message.author.username}#${message.author.discriminator} 500 currency`);
        return message.reply(`Here is **500** stupid, your current balance is: **${dbUser.currency}**`);
      } else {
        return message.reply('No money for you');
      }
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Sorry, couln't fetch reddit post, try again later`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
