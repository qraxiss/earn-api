/**
 * xp service
 */

import { factories, Strapi } from "@strapi/strapi";

const services = ({ strapi }: { strapi: Strapi }) => ({
  async increase(xpId: number, amount: number) {
    return await strapi.db
      .connection("xps")
      .where({ id: xpId })
      .increment("point", amount);
  },
  async decrease(xpId: number, amount: number) {
    return await strapi.db
      .connection("xps")
      .where({ id: xpId })
      .decrement("point", amount);
  },

  async findPoint(userId: number) {
    let xp = await strapi.db.query("api::xp.xp").findOne({
      where: {
        user: userId,
      },
    });

    if (!xp) {
      xp = await strapi.entityService.create("api::xp.xp", {
        data: {
          user: userId,
        },
      });
    }

    return xp;
  },

  async increaseByUserId(userId, amount) {
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    return await strapi.service("api::xp.xp").increase(xp.id, amount);
  },
  async decreaseByUserId(userId, amount) {
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    return await strapi.service("api::xp.xp").decrease(xp.id, amount);
  },

  async purchase(userId: number, price: number) {
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    if (price > xp.point) {
      throw new Error("Balance is not enough!");
    }

    await await strapi.service("api::xp.xp").decrease(xp.id, price);
  },
});

export default factories.createCoreService("api::xp.xp", services);
