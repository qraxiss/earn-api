/**
 * daily service
 */

import { Strapi } from "@strapi/strapi";
import moment from "moment";

export default ({ strapi }: { strapi: Strapi }) => ({
  async claim(userId: number) {
    const { canClaim, remainTimeForClaim } = await strapi
      .service("api::daily.claim-question")
      .status(userId);

    if (!canClaim) {
      throw new Error(
        `You can't claim. You have to wait ${moment
          .utc(remainTimeForClaim * 1000) // ms multipy seconds
          .format("HH:mm:ss")}.`
      );
    }

    await strapi.db.query("api::daily.claim-question").update({
      where: {
        user: userId,
      },
      data: {
        claim: new Date(),
      },
    });
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    await strapi.service("api::xp.xp").increase(xp.id, 5 * 1000 * 1000);

    return await strapi.service("api::xp.xp").findPoint(userId);
  },

  async status(userId: number) {
    let daily = await strapi
      .service("api::daily.claim-question")
      .findDailyfromUserId(userId);

    if (!daily.claim) {
      return {
        canClaim: true,
        remainTimeForClaim: null,
        daily,
      };
    }
    const { yesterday, today, tomorrow, currentTime } = strapi
      .service("api::daily.claim")
      .info(18);

    const claimTime = moment(daily.claim);
    const unit = "seconds";

    if (currentTime > today) {
      if (claimTime > today) {
        return {
          canClaim: false,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(tomorrow, unit),
          daily,
        };
      } else if (claimTime > yesterday) {
        return {
          canClaim: true,
          remainTimeForClaim: null,
          daily,
        };
      }
    } else {
      if (claimTime < today && yesterday < claimTime) {
        return {
          canClaim: false,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(tomorrow, unit),
          daily,
        };
      }
    }
  },

  async findDailyfromUserId(userId) {
    let daily = await strapi.db.query("api::daily.claim-question").findOne({
      where: {
        user: userId,
      },
    });

    if (!daily) {
      daily = await strapi.entityService.create("api::daily.claim-question", {
        data: {
          user: userId,
        },
      });
    }

    return daily;
  },
});
