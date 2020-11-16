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
    - **postmeme** -- (also: 'meme') - posts a random meme from subscribed subreddits
    - **listreddits** -- (also: 'listsubreddits') - lists currently subscribed subreddits
    - **cryptoprice** -- (also: 'crypto', 'btc', 'eth', 'xrp') - lists current cypto prices
    - **stock** -- (also: 'stockprice') - takes one argument in the form of stock symbol 
    - **gamble** -- (also: 'dice') - takes on argument, gamble away your hard earned points
    - **balance** -- (also: 'wallet', 'money', 'currency', 'bal') show current balance
    - **beg** -- (also: 'moneypls') - begs for balance
    - play -- (also: 'song', 'music') - Play your favorite songs, takes one youtube link as argument **coming soon**
    - **listcases** -- (also: 'caselist', 'csgocases') - Lists all available CSGO cases you can open
    - **case** -- (also: 'opencase') Opens a CSGO case
    **For more help join the official Deverobot discord server:** https://discord.gg/eCjP4C7vYG
    `);
  }
}
