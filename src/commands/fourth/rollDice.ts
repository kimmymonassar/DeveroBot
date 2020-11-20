import { Command } from 'discord.js-commando';
import { handleUser, handleUserTimestamp } from '../../api/common/commonUserFunctions';
import rollDiceGame from '../../api/gambling/rollDiceGame';
import handleCurrency from '../../api/gambling/handleCurrency';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

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

  async onError(): Promise<any> {
    throw new CommandoError('discord.js-commando error');
  }

  async run(message: Record<string, any>) {
    try {
      const isSpam = await spamProtection(message);
      if (isSpam) {
        throw new SpamError(`User: ${message.author.username}#${message.author.discriminator} spammed`);
      }
      const isGambling = true;
      const amount = parseInt(message.argString.trim(), 10);
      if (!amount) {
        return message.say('You have to select an amount to gamble, like !b gamble 500');
      }
      const dbUser: any = await handleUser(message);
      await handleUserTimestamp(message);
      const playerBalance = dbUser.currency;

      if (dbUser.currency >= amount) {
        const result = rollDiceGame();
        const didWin = result.player > result.cpu;
        await handleCurrency(dbUser, amount, didWin, isGambling);
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
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`You tilted the bot so hard he got an error, please try again.`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
