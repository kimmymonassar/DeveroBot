import { Command } from 'discord.js-commando';
import { logSuccess, logError } from '../../api/util/logUtil';
import createOrGetUser from '../../db/createOrGetUser';
import rollDiceGame from '../../api/gambling/rollDiceGame';
import handleCurrency from '../../api/gambling/handleCurrency';

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
  async run(message: Record<string, any>) {
    try {
      const dbUser: any = await createOrGetUser(message);
      const result = rollDiceGame();
      const didWin = result.player > result.cpu ? true : false;

      if (didWin) {
        await handleCurrency(dbUser, 500, didWin);
        logSuccess(`Gave ${message.author.username}#${message.author.discriminator} 500 currency`);
        return message.reply(`Here is **500** stupid, your current balance is: **${dbUser.currency}**`);
      } else {
        return message.reply('No money for you');
      }
    } catch (e) {
      logError(`Error from begForCurrency.js: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
