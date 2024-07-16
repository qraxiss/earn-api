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
      if ((data.message.text as string).includes("/start")) {
        await bot.sendMessage(
          data.message.chat.id,
          `Hello! Welcome to the Shopcek Earniverse! 🌟
You are now the owner of your very own virtual shop.
Which items will you stock? You decide. Open your shop, collect coins, and boost your earnings.
Develop your strategy, upgrade your items, and maximize your profits.
We appreciate your efforts, and you'll be rewarded when the token is listed (dates coming soon).🚀
Don't forget about your friends - invite them to join the game and earn even more coins together!
Everyone who launches the app will earn from the airdrop!
`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Start Now",
                    url: "https://t.me/shopcekbot/app",
                  },
                  {
                    text: "Subscribe to the channel",
                    url: "https://t.me/Shopcek",
                  },
                  {
                    text: "Subscribe to X",
                    url: "https://x.com/shopcek",
                  },
                  {
                    text: "How to Play",
                    callback_data: "how_to_play",
                  },
                ],
              ],
            },
          }
        );
      }

      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
};
