/**
 * daily service
 */

import { Strapi } from "@strapi/strapi";
import moment from "moment";

export default ({ strapi }: { strapi: Strapi }) => ({
  async claim(userId: number) {
    const { canClaim, remainTimeForClaim } = await strapi
      .service("api::daily.claim-card")
      .status(userId);

    if (!canClaim) {
      throw new Error(
        `You can't claim. You have to wait ${moment
          .utc(remainTimeForClaim * 1000) // ms multipy seconds
          .format("HH:mm:ss")}.`
      );
    }

    await strapi.db.query("api::daily.claim-card").update({
      where: {
        user: userId,
      },
      data: {
        claim: new Date(),
        finded: false,
      },
    });
    const xp = await strapi.service("api::xp.xp").findPoint(userId);
    await strapi.service("api::xp.xp").increase(xp.id, 5 * 1000 * 1000);

    return await strapi.service("api::xp.xp").findPoint(userId);
  },

  async status(userId: number) {
    let daily = await strapi
      .service("api::daily.claim-card")
      .findDailyfromUserId(userId);
    if (!daily.claim) {
      return {
        canClaim: true && daily.finded,
        remainTimeForClaim: null,
        daily,
        card: await strapi.service("api::daily.claim-card").getChoosen(),
      };
    }
    const { yesterday, today, currentTime } = strapi
      .service("api::daily.claim")
      .info(16);

    const claimTime = moment(daily.claim);
    const unit = "seconds";

    if (currentTime > today) {
      if (claimTime > today) {
        return {
          canClaim: false,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(today, unit),
          daily,
          card: await strapi.service("api::daily.claim-card").getChoosen(),
        };
      } else {
        return {
          canClaim: false,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(today, unit),
          daily,
          card: await strapi.service("api::daily.claim-card").getChoosen(),
        };
      }
    } else {
      if (claimTime < today && yesterday < claimTime) {
        return {
          canClaim: false,
          remainTimeForClaim: 60 * 60 * 24 - currentTime.diff(yesterday, unit),
          daily,
          card: await strapi.service("api::daily.claim-card").getChoosen(),
        };
      } else {
        return {
          canClaim: true && daily.finded,
          remainTimeForClaim: null,
          daily,
          card: await strapi.service("api::daily.claim-card").getChoosen(),
        };
      }
    }
  },

  async getChoosen() {
    const card = await strapi.db.query("api::daily.choosen-card").findOne({
      populate: {
        card: {
          populate: {
            image: true,
          },
        },
      },
    });

    return {
      id: card.card.id,
      name: card.card.name,
      image: card.card.image?.url,
    };
  },

  async findDailyfromUserId(userId) {
    let daily = await strapi.db.query("api::daily.claim-card").findOne({
      where: {
        user: userId,
      },
    });

    if (!daily) {
      daily = await strapi.entityService.create("api::daily.claim-card", {
        data: {
          user: userId,
        },
      });
    }

    return daily;
  },
});
