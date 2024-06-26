/**
 * A set of functions called "actions" for `level`
 */

export default {
  async calculateEarnPerHour(ctx) {
    const { id: userId } = ctx.session;

    try {
      ctx.send({
        data: await strapi
          .service("api::card.level")
          .calculateEarnPerHour(userId),
      });
    } catch (error: any) {
      ctx.throw(error.message, 404);
    }
  },
};
