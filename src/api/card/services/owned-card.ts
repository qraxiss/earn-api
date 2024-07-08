import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findManyOwnedCardFromUserId(userId) {
    const ownedCards = await strapi.db.query("api::card.owned-card").findMany({
      where: {
        user: userId,
      },
      populate: {
        card: {
          populate: {
            category: "*",
          },
        },
      },
    });

    return await strapi
      .service("api::card.level")
      .calculateMultiple(ownedCards);
  },

  async isUserOwnedAlready(cardId, userId) {
    return !!(await strapi.db.query("api::card.owned-card").findOne({
      where: {
        card: cardId,
        user: userId,
      },
    }));
  },

  async findOwnedCard(cardId, userId) {
    const ownedCard = await strapi.db.query("api::card.owned-card").findOne({
      where: {
        card: cardId,
        user: userId,
      },
      populate: {
        card: "*",
      },
    });
    const card = strapi
      .service("api::card.level")
      .calculate(ownedCard.card, ownedCard.level);

    return {
      ...ownedCard,
      card,
    };
  },

  async updateLevelOwnedCard(ownedCardId) {
    return await strapi.db
      .connection("owned_cards")
      .where({ id: ownedCardId })
      .increment("level", 1);
  },
});
