/**
 * daily service
 */

import { Strapi } from "@strapi/strapi";
import moment from "moment";

export default ({ strapi }: { strapi: Strapi }) => ({
  async claim(userId: number) {
    const { daily, canClaim, remainTimeForClaim } = await strapi
      .service("api::daily.claim-login")
      .status(userId);

    if (!canClaim) {
      throw new Error(
        `You can't claim. You have to wait ${moment
          .utc(remainTimeForClaim * 1000) // ms multipy seconds
          .format("HH:mm:ss")}.`
      );
    }
    const days = await strapi.db.query("api::daily.login-reward").findMany();
    const { day } = daily;

    const reward = days.find((reward) => reward.day == day);
    await strapi.db.query("api::daily.claim-login").update({
      where: {
        user: userId,
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
      .service("api::daily.claim-login")
      .findDailyfromUserId(userId);

    if (!daily.claim) {
      return {
        canClaim: true,
        streak: false,
        remainTimeForClaim: null,
        daily,
      };
    }
    const { yesterday, today, tomorrow, currentTime } = strapi
      .service("api::daily.claim")
      .info(0);

    const claimTime = moment(daily.claim);
    const unit = "seconds";

    if (currentTime > today) {
      if (claimTime > today) {
        return {
          canClaim: false,
          streak: true,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(today, unit),
          daily,
        };
      } else if (claimTime > yesterday) {
        return {
          canClaim: true,
          streak: true,
          remainTimeForClaim: null,
          daily,
        };
      } else {
        daily = await strapi.db.query("api::daily.claim-login").update({
          where: {
            id: daily.id,
          },
          data: {
            day: 1,
            claim: null,
          },
        });

        return {
          canClaim: false,
          streak: false,
          remainTimeForClaim: null,
          daily,
        };
      }
    } else {
      if (claimTime < today && yesterday < claimTime) {
        return {
          canClaim: false,
          streak: true,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(yesterday, unit),
          daily,
        };
      } else {
        return {
          canClaim: true,
          remainTimeForClaim: null,
          daily,
        };
      }
    }
  },

  async findDailyfromUserId(userId) {
    let daily = await strapi.db.query("api::daily.claim-login").findOne({
      where: {
        user: userId,
      },
    });

    if (!daily) {
      daily = await strapi.entityService.create("api::daily.claim-login", {
        data: {
          user: userId,
        },
      });
    }

    return daily;
  },
});
