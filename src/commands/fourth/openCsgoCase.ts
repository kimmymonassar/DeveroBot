import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import getCsgoCase from '../../db/getCaseFromDb';
import getPrice from '../../api/caseOpening/steamPriceCheck';
import handleUserValues from '../../api/common/commonUserFunctions';
import { MessageEmbed } from 'discord.js';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

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

  async onError(): Promise<any> {
    throw new CommandoError('discord.js-commando error');
  }

  async run(message: Record<string, any>) {
    try {
      const isSpam = await spamProtection(message);
      if (isSpam) {
        throw new SpamError(`User: ${message.author.username}#${message.author.discriminator} spammed`);
      }

      const argsFromMsg = message.argString.trim();

      await handleUserValues(message);
      const csgoCase = await getCsgoCase(argsFromMsg);

      logSuccess(
        `Got CSGO case with item: ${csgoCase?.name} for ${message.author.username}#${message.author.discriminator}`,
      );

      if (csgoCase) {
        const price = await getPrice(csgoCase.name, csgoCase.wear, csgoCase.grade, csgoCase.statTrak);
        const msg = `
        Rarity: **${csgoCase.grade}**
        Wear: **${csgoCase.wear}**
        StatTrak: **${csgoCase.statTrak}**
        Float: **${csgoCase.float}**
        Lowest market price: **${price.lowest || 'Could not find lowest price for item'}**
        Median market price: **${price.median || 'Could not find median price for item'}**
        **${csgoCase.inspectInGameText}**
        ${csgoCase.inspectInGame}`;

        const embed = new MessageEmbed()
          .setTitle(csgoCase.name)
          .setURL(csgoCase.gunMarketLink)
          .setDescription(msg)
          .setColor(csgoCase.color)
          .setImage(csgoCase.image)
          .setTimestamp();
        return message.embed(embed);
      } else {
        throw new Error('Object csGoCase is null cause no hit from DB');
      }
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.say(`Something went wrong, couldnt get case or item.`);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
