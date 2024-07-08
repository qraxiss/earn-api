import JWT from "jsonwebtoken";
import { config } from "dotenv";
config();

export default {
  async auth(ctx) {
    try {
      const { initData } = ctx.request.body;

      const telegramUser = await strapi
        .service("api::telegram.telegram-user")
        .auth(initData);

      let localTelegramUser = await strapi.db
        .query("api::telegram.telegram-user")
        .findOne({
          where: {
            username: telegramUser.username,
          },
        });

      if (!localTelegramUser) {
        localTelegramUser = await strapi.db
          .query("api::telegram.telegram-user")
          .create({
            data: telegramUser,
          });

        localTelegramUser = await strapi.db
          .query("api::telegram.telegram-user")
          .findOne({
            where: {
              username: telegramUser.username,
            },
          });
      }

      ctx.send({
        jwt: JWT.sign({ id: localTelegramUser.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    } catch (err: any) {
      ctx.throw(err.message, 403);
    }
  },
};
