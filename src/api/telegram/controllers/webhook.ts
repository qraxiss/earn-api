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
      if ((data?.message?.text as string).includes("/start")) {
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
                ],
                [
                  {
                    text: "Subscribe to the channel",
                    url: "https://t.me/Shopcek",
                  },
                ],
                [
                  {
                    text: "Subscribe to X",
                    url: "https://x.com/shopcek",
                  },
                ],
                [
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

      if (data?.callback_query?.data == "how_to_play") {
        const res = await bot.sendMessage(
          data.callback_query.message.chat.id,
          `How to Play in Shopcek Earniverse 🌟
 
💰 Earn Coins Open your shop and start earning coins every second.
 
📈 Upgrade Items Upgrade items in electronics, fashion, real estate, and vehicles to boost your hourly earnings.
 
⏰ Profit Per Hour Your shop will earn coins for 4 hours. After that, log in again to collect your earnings and reopen your shop.
 
👥 Friends Invite friends to join and earn bonuses. Help your friends and earn even more rewards together.
 
🪙 SHPC Token Distribution At the end of the season, SHPC tokens will be distributed among players based on their profit rates. Stay tuned for announcements in our channel!
 
Everyone who launches the app will earn from the airdrop. Don’t miss out on your chance to win big!
`
        );

        console.log("bot-message", res);
      }

      ctx.body = "ok";
    } catch (err) {
      console.log(err);
      ctx.body = "ok";
    }
  },
};
