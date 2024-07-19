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

You are now the owner of your very own virtual shop. Which items will you stock? You decide. Open your shop, collect coins, and boost your earnings.

We appreciate your efforts, and you'll be rewarded when the token is listed (dates coming soon). 🚀

Don't forget about your friends - invite them to join the game and earn even more coins together!`,
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
Upgrade items to boost your hourly earnings.

<b>⏰ Profit Per Hour</b>
Earn coins for 4 hours, then log in again to collect and reopen.

<b>👥 Friends</b>
Invite friends to join and earn bonuses together.

<b>🪙 How to Earn from Airdrop?</b>

Game Performance-Based Rewards: Earn SHPC based on your profit rate.
Referral-Based Rewards: Earn SHPC by referring friends.
Raffle for Big Winners: Join late? No problem! Just launching the app makes you eligible. 40% of the airdrop goes to 500 lucky winners. Shopcek will turn 500 participants into whales! Live raffle three days before token listing, broadcasted in front of millions.

Don’t miss out! Launch the app and be one of the 500 lucky winners!`,
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
