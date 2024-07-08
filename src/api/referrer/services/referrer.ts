/**
 * referer service
 */
import { Strapi } from "@strapi/strapi";
export default ({ strapi }: { strapi: Strapi }) => ({
  async referrerCount(userId) {
    const referrers = await strapi.db.query("api::referrer.referrer").findOne({
      where: {
        user: userId,
      },
      populate: {
        referrers: "*",
      },
    });

    return referrers.referrers.length;
  },

  async referrers(userId) {
    return (
      await strapi.db.query("api::referrer.referrer").findOne({
        where: {
          user: userId,
        },
        populate: {
          referrers: {
            populate: {
              user: "*",
            },
          },
        },
      })
    ).referrers;
  },

  async referTelegramUser(user, referrer) {
    if (!user.start_param && user.telegram_id === user.start_param) {
      return;
    }
    const updateData = await strapi.db.query("api::referrer.referrer").update({
      where: {
        referenceCode: user.start_param,
      },
      data: {
        referrers: {
          connect: [referrer.id],
        },
      },
      populate: {
        user: "*",
      },
    });

    if (!updateData) {
      return;
    }

    return await Promise.all([
      strapi.service("api::xp.xp").increaseByUserId(updateData.user.id, 30000),
      strapi.service("api::xp.xp").increaseByUserId(user.id, 10000),
    ]);
  },
});
