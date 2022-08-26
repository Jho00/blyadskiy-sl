import TelegramBot from "node-telegram-bot-api";
import Store from "./store";
import { getRandomArbitrary } from "./utils";
import { tasks } from "./tasks";

const store = new Store();

export const getRegisterHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    
    const user = store.findUser(chatId, msg.from?.id || -1);
    if (user) {
        bot.sendMessage(chatId, `@${msg.from?.username}, Охуел? Ты и так уже играешь, извращенец`);
        return;
    }
    if (msg.from) {
        store.addUser(chatId, msg.from);
    }
    
    bot.sendMessage(chatId, `Теперь ты в игре блядского эселя, @${msg.from?.username}`);
}

export const getLeaveHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const user = store.findUser(chatId, msg.from?.id || -1);
    if (!user) {
        bot.sendMessage(chatId, `@${msg.from?.username}, Да ты и так не играешь, словно трахаться не хочешь`);
        return;
    }

    if (msg.from) {
        store.removeUser(chatId, msg.from);
    }

    const leakObject = getRandomArbitrary(0, 100) > 50 ? "хуй" : "пизду";
    
    bot.sendMessage(chatId, `Не хочешь лизать ${leakObject}? Ладно, до скорых встреч, @${msg.from?.username}`);
}

export const getStepHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

    const user = store.findUser(chatId, msg.from?.id || -1); 
    if (!user) {
        bot.sendMessage(chatId, `@${msg.from?.username}, Охуел? Ты не играешь`);
        return;
    }

    const randomTaskId = getRandomArbitrary(0, tasks.length);
    const task = tasks[randomTaskId];

    let text = task.message;
    if (task.needActor) {
        text = `@${store.findRandomUser(chatId).username}, ${text}`;
    }

    if (task.needObject) {
        text = `${text} @${store.findRandomUser(chatId).username}`;
    }
      
    bot.sendMessage(chatId, text);
 }

export const getSosiHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

    if (msg.from) {
        store.addUser(chatId, msg.from);
    }

    const user = store.findRandomUser(chatId);

    const isEqual = msg.from?.username == user.username;
    if (isEqual) {
        bot.sendMessage(chatId, `@${user.username} выпал сам себе, теперь придется теребить значимые места}`);
        return;
    }
      
    bot.sendMessage(chatId, `Целуй взасос @${user.username}`);
 }

 export const getHelpHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

      
    bot.sendMessage(chatId, `/register - играть \n/leave - выйти нахуй \n/step - ход \n/sosi - бутылочка`);
 }


 /*****OLD BUT GOLD */


 export const getHuiHandler = (bot: TelegramBot) =>
 async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const user = store.findUser(chatId, msg.from?.id || -1);
    if (user) {
        bot.sendMessage(chatId, `@${msg.from?.username}, Охуел? Ты и так уже играешь, извращенец`);
        return;
    }

    if (msg.from) {
        store.addUser(chatId, msg.from);
    }
    
    bot.sendMessage(chatId, "Сам ты хуй, гнида черномазая");
 }