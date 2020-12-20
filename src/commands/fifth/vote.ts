import { Command } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js';
import { logSuccess } from '../../api/util/logUtil';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class vote extends Command {
  constructor(client: any) {
    super(client, {
      name: 'vote',
      aliases: ['botvote'],
      group: 'fifth',
      memberName: 'vote',
      description: 'Link to vote for bot.',
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
      const embed = new MessageEmbed()
        .setTitle('Help vote for Deverobot to gain more exposure')
        .setThumbnail('https://devero.dev/_nuxt/img/devero_logo_small.8ca5e88.png')
        .setDescription(
          `
        ---------------------------------------------------------
        [https://top.gg/bot/774981128419409960](https://top.gg/bot/774981128419409960)
        ---------------------------------------------------------
        `,
        )
        .setColor('#808080');
      logSuccess('Successfully posted vote options');
      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
