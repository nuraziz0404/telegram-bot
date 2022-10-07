require("dotenv").config();
import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.getMe().then((e) => {
  console.log("[BOT] telegram bot started (https://t.me/%s)", e.username);
});
bot.on("message", (msg) => {
  console.log("[BOT] recheived msg: '%s'", msg.text);
  bot.sendMessage(msg.chat.id, "hello world");
});
