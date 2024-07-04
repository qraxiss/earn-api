/**
 * xp controller
 */

export default {
  async xp(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      const { point } = await strapi.service("api::xp.xp").findPoint(userId);
      const earn = await strapi
        .service("api::card.level")
        .calculateEarnPerHour(userId);

      data = {
        point,
        earn,
      };
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
