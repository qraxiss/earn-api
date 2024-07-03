import { Strapi } from "@strapi/strapi";
import { config } from "dotenv";
config();

export default ({ strapi }: { strapi: Strapi }) => ({
  async cardMarketForUser(userId) {
    const [ownedCards, cards, referrerCount] = await Promise.all([
      strapi
        .service("api::card.owned-card")
        .findManyOwnedCardFromUserId(userId),
      strapi.service("api::card.card").cards(),
      strapi.service("api::referrer.referrer").referrerCount(userId),
    ]);

    const processCard = (card) => {
      const ownedCard = ownedCards.find(
        (ownedCard) => card.id == ownedCard.card.id
      );

      if (ownedCard) {
        const calculatedCard = strapi
          .service("api::card.level")
          .continueCalculate(ownedCard.card, ownedCard.level, 1);

        return {
          id: ownedCard.card.id,
          status: {
            buyed: true,
            level: ownedCard.level,
            totalProfit: Math.round(ownedCard.card.totalProfit),
          },
          info: {
            name: ownedCard.card.name,
            image: process.env.URL + card.image?.url,
          },
          upgrade: {
            price: Math.round(calculatedCard.price),
            profit: Math.round(calculatedCard.profit),
            totalProfit: Math.round(calculatedCard.totalProfit),
          },
        };
      }

      const locked = card.referrerCount > referrerCount;

      return {
        id: card.id,
        info: {
          name: card.name,
          image: process.env.URL + card.image?.url,
          totalProfit: 0,
        },
        status: {
          level: 0,
          buyed: false,
          locked,
          remainInvites: locked
            ? card.referrerCount - referrerCount
            : undefined,
        },
        buy: {
          price: card.price,
          profit: card.profit,
          totalProfit: card.profit,
        },
      };
    };

    return cards.map(processCard);
    // return [ownedCards, cardsByCategory];
  },

  async cards() {
    return await strapi.entityService.findMany("api::card.card", {
      populate: {
        category: true,
        image: true,
      },
    });
  },
});
