import addServer from '../db/addServer';
import { Client } from 'discord.js-commando';
import path from 'path';
import { logSuccess, logFatal } from '../api/logUtil';

const OWNER_ID = process.env.OWNER_ID;
const TOKEN = process.env.TOKEN;

export default class DiscordBot {
  private static _instance: DiscordBot = new DiscordBot();
  private bot = new Client({
    commandPrefix: '!b',
    owner: OWNER_ID,
  });

  constructor() {
    if (DiscordBot._instance) {
      throw new Error('Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.');
    }
    DiscordBot._instance = this;

    this.bot.registry
      .registerDefaultTypes()
      .registerGroups([
        ['first', 'First command group'],
        ['second', 'Second command group'],
        ['third', 'Third command group'],
        ['fourth', 'Third command group'],
        ['fifth', 'Fifth command group'],
        ['sixth', 'Sixth command group'],
      ])
      .registerDefaultGroups()
      .registerDefaultCommands({
        help: false,
        prefix: false,
        ping: true,
        eval: false,
        unknownCommand: true,
        commandState: true,
      })
      .registerCommandsIn(path.join(__dirname, '../commands'));

    this.bot.once('ready', () => {
      logSuccess(`Logged in as ${this.bot.user?.tag}! (${this.bot.user?.id})`);

      this.bot.user?.setActivity('!b help', { type: 'WATCHING' });

      this.bot.guilds.cache.forEach(async (server) => {
        if (server) {
          await addServer(server);
        }
      });
    });

    this.bot.once('reconnecting', () => {
      logFatal('Got disconnected, trying to reconnect');
    });

    this.bot.once('disconnect', () => {
      logFatal('Got disconnected, trying to login');
      this.bot.login(TOKEN);
    });

    this.bot.on('error', console.error);

    this.bot.login(TOKEN);
  }

  public static getInstance(): DiscordBot {
    return DiscordBot._instance;
  }
}
