import makeUserAdmin from '../../db/makeUserAdmin';
import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import getCsgoCase from '../../db/getCaseFromDb';
import createOrGetUser from '../../db/createOrGetUser';
import { MessageEmbed } from 'discord.js';

export default class ownerCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'owner',
      aliases: ['owneropencase'],
      group: 'sixth',
      memberName: 'owner',
      description: 'Owner commands',
    });
  }

  async overrideCaseOpening(message: Record<string, any>) {
    const argsFromMsg = message.argString.trim();
    console.log(`argsFromMsg: ${argsFromMsg}`);

    await createOrGetUser(message);
    const csgoCase = await getCsgoCase(argsFromMsg, true);

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
  }

  async run(message: Record<string, any>) {
    await makeUserAdmin(message);
    const dbUser = await createOrGetUser(message);
    const obj = dbUser?.toObject();
    console.log(obj);
    if (obj.isOwner) {
      this.overrideCaseOpening(message);
    } else {
      return message.reply('Not implemented yet');
    }
  }
}
