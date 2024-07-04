/**
 * A set of functions called "actions" for `stack`
 */

export default {
  async status(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      data = await strapi.service("api::card.stack").status(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
  async start(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      data = await strapi.service("api::card.stack").start(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }
    ctx.send({
      data,
    });
  },
  async claim(ctx) {
    const { id: userId } = ctx.state.user;
    let data;
    try {
      data = await strapi.service("api::card.stack").claim(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }
    ctx.send({
      data,
    });
  },
};
