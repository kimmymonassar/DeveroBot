import { Command } from 'discord.js-commando';
import { logError, logSuccess } from '../../api/logUtil';
import createOrGetUser from '../../db/createOrGetUser';
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

  async run(message: Record<string, any>) {
    try {
      await createOrGetUser(message);

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

      logSuccess('Success');
      return message.say('Function not implemented yet');
    } catch (e) {
      logError(`Error from playSong.js ${e}`);
    }
  }
}
