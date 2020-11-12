import './config/envLoader';
import discordBot from './bot/discordBot';
import dbConnection from './db/dbConnection';

dbConnection.getInstance();
discordBot.getInstance();
