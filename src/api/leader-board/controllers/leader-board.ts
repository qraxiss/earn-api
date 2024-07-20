import moment from "moment";

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
    let totalUser, dailyUser;
    const todaysNumber = (new Date().getDate() % 10) + 1;
    const yesterday = new Date().getTime() - 60 * 60 * 24 * 1000;

    try {
      [totalUser, dailyUser] = await Promise.all([
        strapi.db.query("api::telegram.telegram-user").count(),
        strapi.entityService.count("api::card.stack", {
          filters: {
            updatedAt: {
              $gt: yesterday,
            },
          },
        }),
      ]);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data: {
        dailyActiveUser: dailyUser * 8 + todaysNumber,
        totalUser: totalUser * 8 + todaysNumber,
      },
    });
  },
};
