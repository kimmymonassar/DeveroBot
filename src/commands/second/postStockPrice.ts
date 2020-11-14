import { Command } from 'discord.js-commando';
import getStockPrice from '../../api/getStatistics/getStockPrice';
import createOrGetUser from '../../db/createOrGetUser';
import { logSuccess, logError } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';

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

  async run(message: Record<string, any>) {
    try {
      await createOrGetUser(message);

      const argsFromMsg = message.argString.trim();
      const msg = await getStockPrice(argsFromMsg.trim(), argsFromMsg);

      logSuccess(`Successfully listed stock symbol ${argsFromMsg}`);

      const embed = new MessageEmbed().setDescription(msg).setColor(0x00ae86).setTimestamp();
      return message.embed(embed);
    } catch (e) {
      logError(`Error from postStockPrice.ts: ${e}`);
      return message.reply('You have to supply a valid stock symbol like !b stock SNAP, stupid');
    }
  }
}
