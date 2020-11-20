import { Command } from 'discord.js-commando';
import getStockPrice from '../../api/getStatistics/getStockPrice';
import handleUserValues from '../../api/common/commonUserFunctions';
import { logSuccess } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class postStockPrice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'stock',
      aliases: ['stockprice'],
      group: 'second',
      memberName: 'stock',
      description: 'Posts current price of specified stock symbol',
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

      const argsFromMsg = message.argString.trim();
      const msg = await getStockPrice(argsFromMsg.trim(), argsFromMsg);

      logSuccess(`Successfully listed stock symbol ${argsFromMsg}`);

      const embed = new MessageEmbed().setDescription(msg).setColor(0x00ae86).setFooter('Data from Alpha Vantage');
      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.reply('You have to supply a valid stock symbol like !b stock SNAP');
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
