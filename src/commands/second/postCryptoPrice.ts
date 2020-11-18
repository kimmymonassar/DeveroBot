import { Command } from 'discord.js-commando';
import getCryptoPrice from '../../api/getStatistics/getCryptoPrice';
import createOrGetUser from '../../db/createOrGetUser';
import { logSuccess, logError } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';

export default class postCryptoPrice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'cryptoprice',
      aliases: ['crypto', 'btc', 'eth', 'xrp'],
      group: 'second',
      memberName: 'cryptoprice',
      description: 'Posts current crypto prices',
    });
  }

  async run(message: Record<string, any>) {
    try {
      await createOrGetUser(message);
      const msg = await getCryptoPrice();
      logSuccess('Successfully listed crypto prices');
      const embed = new MessageEmbed().setDescription(msg).setColor(0x00ae86).setTimestamp();
      return message.embed(embed);
    } catch (e) {
      logError(`Error from postCryptoPrice.ts: ${e}`);
      return message.say(`Couldn't get c`);
    }
  }
}
