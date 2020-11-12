import { Command } from 'discord.js-commando';
import getCryptoPrice from '../../api/getCryptoPrice';
import createOrGetUser from '../../db/createOrGetUser';
import { logSuccess, logError } from '../../api/logUtil';
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

  async run(message: any) {
    try {
      const userId = `${message.author.username}#${message.author.discriminator}`;
      await createOrGetUser(userId);
      const msg = await getCryptoPrice();
      logSuccess('Successfully listed crypto prices');
      const embed = new MessageEmbed().setDescription(msg).setColor(0x00ae86).setTimestamp();
      return message.embed(embed);
    } catch (e) {
      logError(`Error from postCryptoPrice.js: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
