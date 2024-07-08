export default {
  async ranks(ctx) {
    let data;
    try {
      const desc = await strapi.entityService.findMany("api::card.stack", {
        sort: "earnPerHour:desc",
        populate: {
          user: true,
        },
        limit: 100,
      });

      data = desc
        .map((item) => ({
          earn: item.earnPerHour,
          name: item?.user?.first_name,
        }))
        .filter((item) => item.earn && item.earn > 0 && item.name);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },

  async stats(ctx) {
    let data;
    try {
      data = await strapi.db.query("api::leader-board.user-count").findOne();
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data: {
        dailyActiveUser: data.dailyActiveUser,
        totalUser: data.totalUser,
      },
    });
  },
};
