/**
 * referer controller
 */

export default {
  async referrerCode(ctx) {
    const { id: userId } = ctx.state.user;

    let data;
    try {
      const { referenceCode } = await strapi
        .service("api::referrer.referrer")
        .findReferrer(userId);
      data = referenceCode;
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },

  async referrerUser(ctx) {
    const { id: userId } = ctx.state.user;
    const { referrerCode } = ctx.request.body;

    let data;
    try {
      data = await strapi
        .service("api::referrer.referrer")
        .referUser(userId, referrerCode);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },

  async findReferrers(ctx) {
    const { id: userId } = ctx.state.user;

    let data;
    try {
      data = await strapi
        .service("api::referrer.referrer")
        .findReferrers(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
