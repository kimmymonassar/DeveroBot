import { Command } from 'discord.js-commando';
import subreddits from '../../../assets/json/subreddits.json';
import { logSuccess } from '../../api/util/logUtil';
import createOrGetUser from '../../db/createOrGetUser';

export default class listSubreddits extends Command {
  constructor(client: any) {
    super(client, {
      name: 'listreddits',
      aliases: ['listsubreddits'],
      group: 'first',
      memberName: 'listreddits',
      description: 'Lists subscribed subreddits.',
    });
  }

  async run(message: Record<string, any>) {
    await createOrGetUser(message);
    logSuccess('Successfully listed subreddits');
    return message.say(`Currently subscribed subreddits: **${subreddits.join(', ')}**`);
  }
}
