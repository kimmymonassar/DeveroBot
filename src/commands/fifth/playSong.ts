import { Command } from 'discord.js-commando';
import { logSuccess } from '../../api/util/logUtil';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';
// import { getSongInfo } from '../../api/handleSongRequests';

export default class playSong extends Command {
  constructor(client: any) {
    super(client, {
      name: 'play',
      aliases: ['song', 'music'],
      group: 'fifth',
      memberName: 'play',
      description: 'Plays a requested song.',
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
      // const argsFromMsg = message.argString.trim();
      // const voiceChannel = message.member.voice.channel;
      // console.log(voiceChannel);
      // const permission = voiceChannel.permissionFor(message.client.id);

      // if (!voiceChannel) {
      //   return message.say('You have to be in a voice channel to use that command');
      // }
      // if (!permission.has('CONNECT') || !permission.has('SPEAK')) {
      //   return message.say('I dont have permission to join that voice channel');
      // }

      // const songInfo = await getSongInfo(argsFromMsg);
      // console.log(JSON.stringify(songInfo));

      // console.log(message.member.voice.channel);

      await handleUserValues(message);
      logSuccess('Success');
      return message.say('Function not implemented yet');
    } catch (e) {
      if (e instanceof SpamError) {
        message.reply(spamErrorText);
      } else if (e instanceof CommandoError) {
        message.reply(userErrorText);
      }
    }
  }
}
