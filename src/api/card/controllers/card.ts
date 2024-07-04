import { Context } from "koa";

export default {
  async cards(ctx: Context) {
    const { id: userId } = ctx.state.user;

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
