/**
 * daily service
 */

import { Strapi } from "@strapi/strapi";
import moment from "moment";

export default ({ strapi }: { strapi: Strapi }) => ({
  async claim(userId: number) {
    const { daily, canClaim, remainTimeForClaim } = await strapi
      .service("api::daily.daily")
      .status(userId);

    if (!canClaim) {
      throw new Error(
        `You can't claim. You have to wait ${moment
          .utc(remainTimeForClaim * 1000) // ms multipy seconds
          .format("HH:mm:ss")}.`
      );
    }
    const days = await strapi.db.query("api::daily.daily-reward").findMany();
    const { day } = daily;

    const reward = days.find((reward) => reward.day == day);
    await strapi.db.query("api::daily.daily").update({
      where: {
        userId,
      },
      data: {
        day: day == days.length ? 1 : day + 1,
        claim: new Date(),
      },
    });
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    await strapi.service("api::xp.xp").increase(xp.id, reward.reward);

    return await strapi.service("api::xp.xp").findPoint(userId);
  },

  async status(userId: number) {
    let daily = await strapi
      .service("api::daily.daily")
      .findDailyfromUserId(userId);

    if (!daily.claim) {
      return {
        canClaim: true,
        streak: false,
        remainTimeForSaveStreak: null,
        remainTimeForClaim: null,
        daily,
      };
    }

    const currentTime = moment();
    const lastClaimTime = moment(daily.claim);
    const unit = "seconds";
    const count = 24 * 3600; // 24 hour
    const diff = currentTime.diff(lastClaimTime, unit);

    if (count >= diff) {
      return {
        canClaim: false,
        streak: true,
        remainTimeForSaveStreak: 2 * count - diff,
        remainTimeForClaim: count - diff,
        daily,
      };
    } else if (diff >= count && 2 * count >= diff) {
      return {
        canClaim: true,
        streak: true,
        remainTimeForSaveStreak: 2 * count - diff,
        remainTimeForClaim: null,
        daily,
      };
    } else if (diff >= 2 * count) {
      daily = await strapi.db.query("api::daily.daily").update({
        where: {
          id: daily.id,
        },
        data: {
          day: 1,
          claim: null,
        },
      });

      return {
        canClaim: true,
        streak: false,
        remainTimeForSaveStreak: null,
        remainTimeForClaim: null,
        daily,
      };
    }
  },

  async findDailyfromUserId(userId) {
    let daily = await strapi.db.query("api::daily.daily").findOne({
      where: {
        userId,
      },
    });

    if (!daily) {
      daily = await strapi.entityService.create("api::daily.daily", {
        data: {
          userId,
        },
      });
    }

    return daily;
  },
});
