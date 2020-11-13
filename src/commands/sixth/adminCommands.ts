import { Command } from 'discord.js-commando';
import createOrGetUser from '../../db/createOrGetUser';

export default class adminCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'admin',
      aliases: [],
      group: 'sixth',
      memberName: 'admin',
      description: 'Admin commands',
    });
  }

  async run(message: Record<string, any>) {
    await createOrGetUser(message);
    return message.reply('Not implemented yet');
  }
}
