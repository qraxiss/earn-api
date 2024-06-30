export default {
  async cards(ctx) {
    const { id: userId } = ctx.session;

    let data;
    try {
      data = await strapi.service("api::card.card").cardMarketForUser(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
