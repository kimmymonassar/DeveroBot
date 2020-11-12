import { Command } from 'discord.js-commando';
import { logSuccess, logError } from '../../api/logUtil';
import createOrGetUser from '../../db/createOrGetUser';
import rollDiceGame from '../../api/rollDiceGame';
import handleCurrency from '../../api/handleCurrency';

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
  async run(message: any) {
    try {
      const user = `${message.author.username}#${message.author.discriminator}`;
      const dbUser: any = await createOrGetUser(user);
      const result = rollDiceGame();
      const didWin = result.player > result.cpu ? true : false;

      if (didWin) {
        await handleCurrency(dbUser, 500, didWin);
        logSuccess(`Gave ${user} 500 currency`);
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
