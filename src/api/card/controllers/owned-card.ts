export default {
  async ownedCards(ctx) {
    const { id } = ctx.state.user;

    let data;
    try {
      data = await strapi
        .service("api::card.owned-card")
        .findManyOwnedCardFromUserId(id);
    } catch (error: any) {
      ctx.throw(error.message, 500);
    }

    if (data.length === 0) {
      ctx.throw("User have no cards.", 404);
    }

    ctx.send({
      data,
    });
  },

  async buyCard(ctx) {
    const { cardId } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const isUserOwnedAlready = await strapi
      .service("api::card.owned-card")
      .isUserOwnedAlready(cardId, userId);
    if (isUserOwnedAlready) {
      ctx.throw("User already bought this card!", 400);
    }

    const card = await strapi.entityService.findOne("api::card.card", cardId);
    const isCardNotExist = !card;
    if (isCardNotExist) {
      ctx.throw("Card not found!", 404);
    }

    try {
      await strapi.service("api::xp.xp").purchase(userId, card.price);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }
    try {
      const cardClaimStatus = await strapi
        .service("api::daily.claim-card")
        .status(userId);
      if (!cardClaimStatus.canClaim && cardClaimStatus.card.id === cardId) {
        await strapi.entityService.update(
          "api::daily.claim-card",
          cardClaimStatus.daily.id,
          {
            data: {
              finded: true,
            },
          }
        );
      }
    } catch (error: any) {}
    const ownedCard = await strapi.entityService.create(
      "api::card.owned-card",
      {
        data: {
          user: userId,
          card: card.id,
        },
      }
    );

    ctx.send({
      data: ownedCard,
    });
  },

  async upgradeCard(ctx) {
    const { cardId } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const isUserOwnedAlready = await strapi
      .service("api::card.owned-card")
      .isUserOwnedAlready(cardId, userId);
    if (!isUserOwnedAlready) {
      ctx.throw("User don't have this card. Please buy first!", 400);
    }

    const ownedCard = await strapi
      .service("api::card.owned-card")
      .findOwnedCard(cardId, userId);

    // calculate next level price
    const nextLevelCard = strapi
      .service("api::card.level")
      .continueCalculate(ownedCard.card, ownedCard.level, 1);

    try {
      await strapi.service("api::xp.xp").purchase(userId, nextLevelCard.price);
    } catch (error: any) {
      ctx.throw(
        error.message,
        error.message === "Balance is not enough!" ? 400 : 500
      );
    }

    try {
      await strapi
        .service("api::card.owned-card")
        .updateLevelOwnedCard(ownedCard.id);
    } catch (error: any) {
      ctx.throw(error.message, 500);
    }

    try {
      const cardClaimStatus = await strapi
        .service("api::daily.claim-card")
        .status(userId);
      if (!cardClaimStatus.canClaim && cardClaimStatus.card.id === cardId) {
        await strapi.entityService.update(
          "api::daily.claim-card",
          cardClaimStatus.daily.id,
          {
            data: {
              finded: true,
            },
          }
        );
      }
    } catch (error: any) {}

    ctx.send({
      data: await strapi
        .service("api::card.owned-card")
        .findOwnedCard(cardId, userId),
    });
  },
};
