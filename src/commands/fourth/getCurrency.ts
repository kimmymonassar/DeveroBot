import { Command } from 'discord.js-commando';
import { logSuccess, logError } from '../../api/logUtil';
import createOrGetUser from '../../db/createOrGetUser';

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

  async run(message: any) {
    try {
      const user = `${message.author.username}#${message.author.discriminator}`;
      const dbUser: any = await createOrGetUser(user);
      const playerBalance = dbUser.currency;
      logSuccess(`Posted current balance for ${user}`);
      return message.reply(`Your current balance is: **${playerBalance}**`);
    } catch (e) {
      logError(`Error from getCurrency.js: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
