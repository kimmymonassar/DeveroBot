import { Command } from 'discord.js-commando';
import getCoronaStats from '../../api/getStatistics/getCoronaStats';
import handleUserValues from '../../api/common/commonUserFunctions';
import { logSuccess } from '../../api/util/logUtil';
import { MessageEmbed } from 'discord.js';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class postCoronaStats extends Command {
  constructor(client: any) {
    super(client, {
      name: 'corona',
      aliases: ['coronastats', 'covid', 'pandemic'],
      group: 'second',
      memberName: 'corona',
      description: 'Posts current corona statistics for specified country',
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
      if (!message.argString) {
        return message.reply('You have to write !b corona <country>');
      }
      const argsFromMsg = message.argString.trim().replace(/ /g, '-');
      const msg = await getCoronaStats(argsFromMsg);
      logSuccess('Successfully posted corona stats');
      const embed = new MessageEmbed().setDescription(msg).setColor('#FF2D00').setTimestamp();
      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Failed to get corona stats from API`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
