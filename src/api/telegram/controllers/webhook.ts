/**
 * A set of functions called "actions" for `webhook`
 */

import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN);

export default {
  webhook: async (ctx, next) => {
    const data = ctx.request.body;
    console.log("body: ", ctx.request.body);
    console.log("headers: ", ctx.request.headers);
    console.log("query: ", ctx.request.query);

    try {
      await bot.sendMessage(data.message.chat.id, data.message.text);
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
};
