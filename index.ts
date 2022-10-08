require("dotenv").config();
import TelegramBot from "node-telegram-bot-api";
import Express from "express";
import { exec } from "child_process";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function uptime() {
  const t = Math.floor(process.uptime());
  const _d = t % 86400;
  const d = (t - _d) / 86400;

  const _h = _d % 3600;
  const h = (_d - _h) / 3600;

  const _m = _h % 60;
  const m = (_h - _m) / 60;

  const s = _m;

  return `${d}d, ${h}h, ${m}m, ${s}s`;
}

bot.getMe().then((e) => {
  console.log("[BOT] telegram bot started (https://t.me/%s)", e.username);
});

bot.onText(/\/uptime(.*)/i, (msg, match) => {
  bot.sendMessage(msg.chat.id, `uptime: ${uptime()}`);
});
bot.onText(/\/exec(.*)/i, (msg, match) => {
  console.log("[Exec] %s", match[1]);
  exec(match[1], (err, out, outErr) => {
    if (err || outErr) {
      bot.sendMessage(msg.chat.id, `Exec error:\n` + String(err || outErr));
    } else {
      bot.sendMessage(msg.chat.id, `Exec output:\n` + String(out));
    }
  });
});

bot.on("message", (msg) => {
  console.log("[BOT] recheived msg: '%s'", msg.text);
  bot.sendMessage(msg.chat.id, "hello world");
});

const app = Express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = parseInt(process.env.PORT) || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log("Express running on http://localhost:%s", port);
});
