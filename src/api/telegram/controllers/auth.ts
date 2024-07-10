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
            telegram_id: String(telegramUser.telegram_id),
          },
        });

      //register
      if (!localTelegramUser) {
        localTelegramUser = await strapi.db
          .query("api::telegram.telegram-user")
          .create({
            data: telegramUser,
          });

        const [xp, stack, referrer, login, question, card] = await Promise.all([
          strapi.entityService.create("api::xp.xp", {
            data: {
              user: localTelegramUser.id,
            },
          }),

          strapi.entityService.create("api::card.stack", {
            data: {
              user: localTelegramUser.id,
            },
          }),

          strapi.entityService.create("api::referrer.referrer", {
            data: {
              user: localTelegramUser.id,
              referenceCode: localTelegramUser.telegram_id,
            },
          }),
          strapi.entityService.create("api::daily.claim-login", {
            data: {
              user: localTelegramUser.id,
            },
          }),

          strapi.entityService.create("api::daily.claim-question", {
            data: {
              user: localTelegramUser.id,
            },
          }),

          strapi.entityService.create("api::daily.claim-card", {
            data: {
              user: localTelegramUser.id,
            },
          }),
        ]);

        await strapi
          .service("api::referrer.referrer")
          .referTelegramUser(
            { id: localTelegramUser.id, ...telegramUser },
            referrer
          );
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
