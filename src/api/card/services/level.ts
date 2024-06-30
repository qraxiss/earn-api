/**
 * level service
 */

export default () => ({
  calculateLogic(card, level) {
    let {
      profit,
      price,
      pricePercentage,
      profitPercentage,
      pricePercentageStart,
    } = card;

    let totalProfit = profit;
    let relativePricePercentage = pricePercentageStart;
    for (let index = 1; index < level; index++) {
      profit += profit * (profitPercentage / 100);
      totalProfit += profit;
      price += price * (relativePricePercentage / 100);
      relativePricePercentage = pricePercentage + relativePricePercentage;
    }
    const calculated = {
      ...card,
      profit,
      totalProfit,
      price,
      pricePercentage,
      profitPercentage,
      pricePercentageStart,
    };
    return calculated;
  },
  continueCalculate(card: any, level: number, steps: number) {
    let {
      profit,
      price,
      pricePercentage,
      profitPercentage,
      pricePercentageStart,
      totalProfit,
    } = card;

    let relativePricePercentage = pricePercentageStart;
    for (let index = 1; index < level; index++) {
      relativePricePercentage = pricePercentage + relativePricePercentage;
    }

    for (let index = 1; index <= steps; index++) {
      profit += profit * (profitPercentage / 100);
      totalProfit += profit;
      price += price * (relativePricePercentage / 100);
      relativePricePercentage = pricePercentage + relativePricePercentage;
    }
    const calculated = {
      ...card,
      profit,
      totalProfit,
      price,
      pricePercentage,
      profitPercentage,
      pricePercentageStart,
    };
    return calculated;
  },
  calculate(card: any, level: number) {
    return strapi.service("api::card.level").calculateLogic(card, level);
  },

  calculateMultiple(ownedCards: any[]) {
    return ownedCards.map((ownedCard) => ({
      ...ownedCard,
      card: strapi
        .service("api::card.level")
        .calculateLogic(ownedCard.card, ownedCard.level),
    }));
  },

  async calculateEarnPerHour(userId) {
    const ownedCards = await strapi
      .service("api::card.owned-card")
      .findManyOwnedCardFromUserId(userId);

    let earnPerHour = 0;

    ownedCards.forEach((ownedCard) => {
      earnPerHour += ownedCard.card.profit;
    });

    return earnPerHour;
  },
});
