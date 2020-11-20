import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import listCases from '../../db/listCasesFromDb';
import handleUserValues from '../../api/common/commonUserFunctions';
import { MessageEmbed } from 'discord.js';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class listCsgoCases extends Command {
  constructor(client: any) {
    super(client, {
      name: 'listcases',
      aliases: ['caselist', 'csgocases'],
      group: 'fourth',
      memberName: 'listcsgocases',
      description: 'Lists all available CSGO cases',
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
      const msg = await listCases();

      const embed = new MessageEmbed()
        .setTitle('Available cases')
        .setThumbnail(
          'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU2nfGaJG0btN2wwYHfxa-hY-uFxj4Dv50nj7uXpI7w3AewrhBpMWH6d9CLMlhpEbAe-Zk/256fx256f',
        )
        .setDescription(msg)
        .setColor('#228B22');
      logSuccess(`Successfully listed all available CSGO cases from DB`);
      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Something went wrong, couldn't currently get case list`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
