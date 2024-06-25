/**
 * level service
 */

export default () => ({
  async calculate(cardId: string | number, level: number) {
    const card = await strapi.entityService.findOne("api::card.card", cardId);

    if (!card) {
      throw new Error("Card not found!");
    }

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

    return {
      id: card.id,
      profit,
      price,
      pricePercentage,
      profitPercentage,
      pricePercentageStart,
    };
  },
});
