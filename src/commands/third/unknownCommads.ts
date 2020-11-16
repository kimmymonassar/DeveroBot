import { Command } from 'discord.js-commando';
import createOrGetUser from '../../db/createOrGetUser';

export default class UnknownCommandCommand extends Command {
  constructor(client: any) {
    super(client, {
      name: 'unknown-command',
      group: 'third',
      memberName: 'unknown-command',
      description: 'Displays help information for when an unknown command is used.',
      examples: ['unknown-command kickeverybodyever'],
      unknown: true,
      hidden: true,
    });
  }

  async run(message: Record<string, any>) {
    await createOrGetUser(message);
    return message.reply(
      `Unknown command. Use ${message.anyUsage(
        'help',
        message.guild ? undefined : null,
        message.guild ? undefined : null,
      )} to view list of available commands and features.`,
    );
  }
}
