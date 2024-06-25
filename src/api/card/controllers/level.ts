/**
 * A set of functions called "actions" for `level`
 */

export default {
  async calculate(ctx) {
    const { cardId, level } = ctx.request.body;

    try {
      ctx.body = await strapi
        .service("api::card.level")
        .calculate(cardId, level);
    } catch (error: any) {
      ctx.throw(error.message, 404);
    }
  },
};
