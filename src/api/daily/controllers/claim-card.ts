/**
 * daily controller
 */

export default {
  async claim(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      data = await strapi.service("api::daily.claim-card").claim(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }
    ctx.send({
      data: await strapi.service("api::daily.claim-card").status(userId),
    });
  },

  async status(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      data = await strapi.service("api::daily.claim-card").status(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
