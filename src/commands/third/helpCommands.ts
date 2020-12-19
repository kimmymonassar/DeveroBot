import { Command } from 'discord.js-commando';
import handleUserValues from '../../api/common/commonUserFunctions';
import spamProtection from '../../api/util/spamProtection';
import { SpamError, TypeError, CommandoError, userErrorText, spamErrorText } from '../../api/util/errorHandler';

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
      return message.reply(`List of currently working commands:
      - **postmeme** -- (also: 'meme') - posts a random meme from subscribed subreddits
      - **listreddits** -- (also: 'listsubreddits') - lists currently subscribed subreddits
      - **cryptoprice** -- (also: 'crypto', 'btc', 'eth', 'xrp') - lists current cypto prices
      - **stock** -- (also: 'stockprice') - takes one argument in the form of stock symbol 
      - **gamble** -- (also: 'dice') - takes on argument, gamble away your hard earned points
      - **balance** -- (also: 'wallet', 'money', 'currency', 'bal') show current balance
      - **beg** -- (also: 'moneypls') - begs for balance
      - **listcases** -- (also: 'caselist', 'csgocases') - Lists all available CSGO cases you can open
      - **case** -- (also: 'open', 'opencase') Opens a CSGO case
      - **info** -- (also: 'botinfo', 'github', 'roadmap') shows bot info and relevant links
      - **suggestion** -- (also: 'suggestions', 'feature') suggest new features to be added to the bot
      **For more help join the official Deverobot discord server:** https://discord.gg/eCjP4C7vYG
      `);
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
