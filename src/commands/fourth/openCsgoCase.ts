import { Command } from 'discord.js-commando';
import { logSuccess, logError } from '../../api/util/logUtil';
import getCsgoCase from '../../db/getCaseFromDb';
import createOrGetUser from '../../db/createOrGetUser';
import { MessageEmbed } from 'discord.js';

export default class openCsgoCase extends Command {
  constructor(client: any) {
    super(client, {
      name: 'case',
      aliases: ['opencase', 'open'],
      group: 'fourth',
      memberName: 'opencsgocase',
      description: 'Open a CSGO case',
    });
  }

  async run(message: Record<string, any>) {
    try {
      const argsFromMsg = message.argString.trim();

      await createOrGetUser(message);
      const csgoCase = await getCsgoCase(argsFromMsg);

      logSuccess(
        `Got CSGO case with item: ${csgoCase?.name} for ${message.author.username}#${message.author.discriminator}`,
      );

      if (csgoCase) {
        const msg = `
        Rarity: **${csgoCase?.grade}**
        Wear: **${csgoCase?.wear}**
        StatTrak: **${csgoCase?.statTrak}**
        Float: **${csgoCase?.float}**
        **${csgoCase?.inspectInGameText}**
        ${csgoCase?.inspectInGame}`;

        const embed = new MessageEmbed()
          .setTitle(csgoCase?.name)
          .setURL(csgoCase?.gunMarketLink)
          .setDescription(msg)
          .setColor(csgoCase?.color)
          .setImage(csgoCase?.image);
        return message.embed(embed);
      } else {
        throw new Error('Object csGoCase is null cause no hit from DB');
      }
    } catch (e) {
      logError(`Error from openCsgoCase.ts: ${e}`);
      return message.say('Something went wrong, couldnt get case or item.');
    }
  }
}
