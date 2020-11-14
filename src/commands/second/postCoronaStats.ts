import { Command } from 'discord.js-commando';
import getCoronaStats from '../../api/getStatistics/getCoronaStats';
import createOrGetUser from '../../db/createOrGetUser';
import { logSuccess, logError } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';

export default class postCryptoPrice extends Command {
  constructor(client: any) {
    super(client, {
      name: 'corona',
      aliases: ['coronastats', 'covid', 'pandemic'],
      group: 'second',
      memberName: 'corona',
      description: 'Posts current corona statistics for specified country',
    });
  }

  async run(message: Record<string, any>) {
    try {
      await createOrGetUser(message);
      if (!message.argString) {
        return message.reply('You have to write !b corona <country>');
      }
      const argsFromMsg = message.argString.trim().replace(/ /g, '-');
      const msg = await getCoronaStats(argsFromMsg);
      logSuccess('Successfully posted corona stats');
      const embed = new MessageEmbed().setDescription(msg).setColor('#FF2D00').setTimestamp();
      return message.embed(embed);
    } catch (e) {
      logError(`Error from postCoronaStats.ts: ${e}`);
      return message.say('Something went wrong');
    }
  }
}
