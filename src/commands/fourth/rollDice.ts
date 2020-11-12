import { Command } from 'discord.js-commando';
import { logError } from '../../api/logUtil';
import createOrGetUser from '../../db/createOrGetUser';
import rollDiceGame from '../../api/rollDiceGame';
import handleCurrency from '../../api/handleCurrency';

export default class rollDice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'gamble',
      aliases: ['dice'],
      group: 'fourth',
      memberName: 'gamble',
      description: 'Rolls dice for money',
    });
  }

  async run(message: Record<string, any>) {
    try {
      const amount = parseInt(message.argString.trim(), 10);
      const dbUser: any = await createOrGetUser(message);
      const playerBalance = dbUser.currency;

      if (dbUser.currency >= amount) {
        const result = rollDiceGame();
        const didWin = result.player > result.cpu ? true : false;
        await handleCurrency(dbUser, amount, didWin);
        if (result.player > result.cpu) {
          return message.reply(
            `•••**Your roll: ${result.player}**••• •••**Bot roll: ${
              result.cpu
            }**••• Congratulations you won! Your balance is now: **${playerBalance + amount}**`,
          );
        } else if (result.player < result.cpu) {
          return message.reply(
            `•••**Your roll: ${result.player}**••• •••**Bot roll: ${result.cpu}**••• You lost **${amount}** you fucking loser`,
          );
        } else {
          return message.reply(
            `•••**Your roll: ${result.player}**••• •••**Bot roll: ${result.cpu}**••• Tie! You get your points back`,
          );
        }
      } else {
        return message.reply(`Lol you're too poor, current balance is: ${dbUser.currency}`);
      }
    } catch (e) {
      logError(`Error from rollDice.js: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
