/**
 * referer service
 */
import { Strapi } from "@strapi/strapi";
export default ({ strapi }: { strapi: Strapi }) => ({
  async referUser(userId: number, referenceCode: string) {
    const refer = await strapi
      .service("api::referrer.referrer")
      .findReferrerByUserId(userId);

    if (refer.referenceCodeRegistered) {
      throw new Error("User already registered with reference code!");
    }

    const referrerUser = await strapi
      .service("api::referrer.referrer")
      .findReferrerByReferenceCode(referenceCode);

    if (!referrerUser) {
      throw new Error(`There is no user with this ${referenceCode} code.`);
    }

    if (referrerUser.userId == userId) {
      throw new Error("You can't use your reference code!");
    }

    const updatedRefer = await strapi.entityService.update(
      "api::referrer.referrer",
      refer.id,
      {
        data: {
          referenceCodeRegistered: referenceCode,
        },
      }
    );

    await Promise.all([
      strapi.service("api::xp.xp").increaseByUserId(referrerUser.userId, 30000),
      strapi.service("api::xp.xp").increaseByUserId(userId, 10000),
    ]);

    return updatedRefer;
  },

  async findReferrerByUserId(userId) {
    let refer = await strapi.db.query("api::referrer.referrer").findOne({
      where: {
        userId,
      },
    });

    if (!refer) {
      refer = await strapi.db.query("api::referrer.referrer").create({
        data: {
          userId,
        },
      });
    }

    return refer;
  },

  async findReferrerByReferenceCode(referenceCode) {
    const refer = await strapi.db.query("api::referrer.referrer").findOne({
      where: {
        referenceCode,
      },
    });

    if (!refer) {
      throw new Error(`${referenceCode} not found!`);
    }

    return refer;
  },

  async findReferrers(userId) {
    const refer = await strapi
      .service("api::referrer.referrer")
      .findReferrerByUserId(userId);

    return await strapi.db.query("api::referrer.referrer").findMany({
      filters: {
        referenceCodeRegistered: refer.referenceCode,
      },
    });
  },
});
