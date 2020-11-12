import { Command } from 'discord.js-commando';
import createOrGetUser from '../../db/createOrGetUser';

export default class getHelpCommands extends Command {
  constructor(client: any) {
    super(client, {
      name: 'helppls',
      aliases: ['help', 'imstupid', 'helpcommands', 'plshelp'],
      group: 'third',
      memberName: 'helppls',
      description: 'Posts currently available commands',
    });
  }

  async run(message: Record<string, any>) {
    await createOrGetUser(message);
    return message.reply(`List of currently working commands:
    - **postmeme** (aliases: just meme also works) - posts a random meme from subscribed subreddits
    - **listreddits** (aliases: listsubreddits also works) - lists currently subscribed subreddits
    - **cryptoprice** (aliases: 'crypto', 'btc', 'eth', 'xrp' also works) - lists current cypto prices
    - **stock** - takes one argument in the form of stock symbol (name) and returns current price
    - **gamble** -- takes on argument, gamble away your hard earned points
    - **balance** -- (aliases: 'balance', 'wallet', 'money', 'bal') show current balance
    - **beg** -- (alias: 'moneypls') begs for balance
    - **corona** -- (aliases: 'coronastats', 'covid', 'pandemic') - takes one parameter in the form of country
    `);
  }
}
