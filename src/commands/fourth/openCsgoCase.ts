import { Command } from 'discord.js-commando';
import { logSuccess, logError } from '../../api/util/logUtil';
import getCsgoCase from '../../db/getCaseFromDb';
import createOrGetUser from '../../db/createOrGetUser';
import { MessageEmbed } from 'discord.js';
import transformToTitleCase from '../../api/util/transformToTitleCase';

export default class openCsgoCase extends Command {
  constructor(client: any) {
    super(client, {
      name: 'case',
      aliases: ['opencase'],
      group: 'second',
      memberName: 'opencsgocase',
      description: 'Open a CSGO case',
    });
  }

  async run(message: Record<string, any>) {
    try {
      const argsFromMsg = transformToTitleCase(message.argString.trim());
      console.log(`argsFromMsg: ${argsFromMsg}`);

      await createOrGetUser(message);
      const csgoCase = await getCsgoCase(argsFromMsg);

      logSuccess(
        `Got CSGO case with item: ${csgoCase?.name} for ${message.author.username}#${message.author.discriminator}`,
      );

      const msg = `
      **Congratulations! Your case contained**
      Weapon: **${csgoCase?.name}**
      Rarity: **${csgoCase?.grade}**
      Wear: **${csgoCase?.wear}**
      StatTrak: **${csgoCase?.statTrak}**
      Float: **${csgoCase?.float}**`;

      const embed = new MessageEmbed().setDescription(msg).setColor(csgoCase?.color).setTimestamp();
      return message.embed(embed);
    } catch (e) {
      logError(`Error from openCsgoCase.ts: ${e}`);
      return message.say('Something went wrong, currently only Fracture Case is supported.');
    }
  }
}
