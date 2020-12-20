import { Command } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

export default class inviteHelpCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'info',
      aliases: ['invite', 'botinfo', 'github', 'roadmap'],
      group: 'third',
      memberName: 'info',
      description: 'Posts link to invite Deverobot to your server',
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
        .setColor('#EAEAEA')
        .setTitle('Invite Deverobot to your channel')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=774981128419409960&permissions=3536896&scope=bot')
        .setAuthor('Deverobot#7186', 'https://devero.dev/_nuxt/img/devero_logo_small.8ca5e88.png', 'https://devero.dev')
        .setDescription(
          'Awesome Discord bot to show various statistics, gamble, open CSGO cases etc. You can see upcoming features at our Github repositorys roadmap [Roadmap](https://github.com/kimmymonassar/DeveroBot/blob/master/README.md#roadmap).',
        )
        .setThumbnail('https://devero.dev/_nuxt/img/devero_logo_small.8ca5e88.png')
        .addFields(
          { name: '\u200B', value: '\u200B' },
          {
            name: 'Official website',
            value: '[devero.dev](https://devero.dev)',
            inline: true,
          },
          {
            name: 'Github repo',
            value: '[Github](https://github.com/kimmymonassar/DeveroBot)',
            inline: true,
          },
          {
            name: 'Report a issue/bug',
            value: '[Github](https://github.com/kimmymonassar/DeveroBot/issues)',
            inline: true,
          },
        )
        .setTimestamp()
        .setFooter('Keep on keeping on', 'https://devero.dev/_nuxt/img/devero_logo_small.8ca5e88.png');

      return message.embed(embed);
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof TypeError) {
        message.reply('Something went wrong');
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
