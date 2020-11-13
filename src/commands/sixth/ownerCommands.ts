import { Command } from 'discord.js-commando';
import createOrGetUser from '../../db/createOrGetUser';
import makeUserAdmin from '../../db/makeUserAdmin';

export default class ownerCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'owner',
      aliases: [],
      group: 'sixth',
      memberName: 'owner',
      description: 'Owner commands',
    });
  }

  async run(message: Record<string, any>) {
    await makeUserAdmin(message);
    await createOrGetUser(message);
    return message.reply('Not implemented yet');
  }
}
