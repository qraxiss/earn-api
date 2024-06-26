/**
 * level service
 */

function calculate(card, level) {
  let {
    profit,
    price,
    pricePercentage,
    profitPercentage,
    pricePercentageStart,
  } = card;

  let relativePricePercentage = pricePercentageStart;
  for (let index = 0; index < level; index++) {
    profit += profit * (profitPercentage / 100);
    price += price * (relativePricePercentage / 100);

    relativePricePercentage = pricePercentage + relativePricePercentage;
  }
  const calculated = {
    ...card,
    profit,
    price,
    pricePercentage,
    profitPercentage,
    pricePercentageStart,
  };
  return calculated;
}

export default () => ({
  calculate(card: any, level: number) {
    return calculate(card, level);
  },

  calculateMultiple(ownedCards: any[]) {
    return ownedCards.map((ownedCard) => ({
      ...ownedCard,
      card: calculate(ownedCard.card, ownedCard.level),
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
