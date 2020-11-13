import { Command } from 'discord.js-commando';
import createOrGetUser from '../../db/createOrGetUser';
import makeUserAdmin from '../../db/makeUserAdmin';
import { isOwner } from '../../api/util/isAdmin';

export default class makeAdminCommand extends Command {
  constructor(client: any) {
    super(client, {
      name: 'makeadmin',
      aliases: [],
      group: 'sixth',
      memberName: 'makeadmin',
      description: 'Owner command to make user admin',
    });
  }

  async run(message: Record<string, any>) {
    await createOrGetUser(message);
    if (isOwner(message.author.id)) {
      await makeUserAdmin(message);
      return message.say('Made user admin');
    } else {
      return message.say('Only owner can use that command');
    }
  }
}
