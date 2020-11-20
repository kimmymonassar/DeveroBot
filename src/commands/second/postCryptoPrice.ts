import { Command } from 'discord.js-commando';
import getCryptoPrice from '../../api/getStatistics/getCryptoPrice';
import handleUserValues from '../../api/common/commonUserFunctions';
import { logSuccess } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

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
      const msg = await getCryptoPrice();
      logSuccess('Successfully listed crypto prices');
      const embed = new MessageEmbed().setDescription(msg).setColor(0x00ae86).setTimestamp();
      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Failed to get crypto stats from API, try again later.`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
