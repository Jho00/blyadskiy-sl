import { getHelpHandler, 
    getHuiHandler,
    getSosiHandler,
    getRegisterHandler,
    getLeaveHandler,
    getStepHandler } 
from "./handlers";

const config = require('./config');

const TelegramBot = require('node-telegram-bot-api');

const token = config.tg_token;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/register/, getRegisterHandler(bot));
bot.onText(/\/leave/, getLeaveHandler(bot));
bot.onText(/\/sosi/, getSosiHandler(bot));
bot.onText(/\/step/, getStepHandler(bot));
bot.onText(/\/help/, getHelpHandler(bot));


bot.onText(/\/hui/, getHuiHandler(bot));