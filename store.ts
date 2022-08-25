import TelegramBot from "node-telegram-bot-api";
import { getRandomArbitrary } from "./utils";

interface User {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string | undefined;
    username?: string | undefined;
    language_code?: string | undefined;
}

class Store {
   private namespaсes: Map<number, User[]> = new Map();

   addUser(chatId: number, user: User) {
       let users = this.namespaсes.get(chatId);
       if (!users) {
           users = [];
       }

       if (users.some(u => user.id === u.id)) {
           return;
       }

       users.push(user);
       this.namespaсes.set(chatId, users);
   }

   removeUser(chatId: number, user: User) {
    let users = this.namespaсes.get(chatId);
    if (!users) {
        throw new Error(`Can't find chat with id ${chatId}`);
    }
    users = users.filter(u => u.id !== user.id);
    this.namespaсes.set(chatId, users)
   }

   findUser(chatId: number, id: number) {
    const users = this.namespaсes.get(chatId);
    if (!users) {
        // throw new Error(`Can't find chat with id ${chatId}`);
        return null;
    }
    return users.find(u => u.id === id);
   }

   findRandomUser(chatId: number): User {
    const users = this.namespaсes.get(chatId);
    if (!users) {
        throw new Error(`Can't find chat with id ${chatId}`);
    }
    return users[Math.floor(Math.random()*users.length)];
   }
}

export default Store;