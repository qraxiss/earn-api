import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN);

export default {
  webhook: async (ctx, next) => {
    const data = ctx.request.body;

    try {
      if (
        data?.message?.text &&
        (data?.message?.text as string).includes("/start")
      ) {
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
                    url: "https://t.me/shopcekbot/start",
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
        await bot.sendMessage(
          data.callback_query.message.chat.id,
          `<b>How to Play in Shopcek Earniverse 🌟</b>

<b>💰 Earn Coins</b>
Open your shop and start earning coins every second.

<b>📈 Upgrade Items</b>
Upgrade items in electronics, fashion, real estate, and vehicles to boost your hourly earnings.

<b>⏰ Profit Per Hour</b>
Your shop will earn coins for 4 hours. After that, log in again to collect your earnings and reopen your shop.

<b>👥 Friends</b>
Invite friends to join and earn bonuses. Help your friends and earn even more rewards together.

<b>🪙 How to Earn from Airdrop?</b>

SHPC tokens will be distributed based on profit rates.
Earn more SHPC by referring friends with your referral links. You can benefit from both!

<b>EVERYONE</b> who launches the app will <b>EARN</b> from the airdrop. Don’t miss out on your chance to <b>WIN BIG!</b>`,
          {
            parse_mode: "HTML",
          }
        );
      }

      ctx.body = "ok";
    } catch (err) {
      console.log(err);
      ctx.body = "ok";
    }
  },
};
