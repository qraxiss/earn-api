/**
 * referer controller
 */

export default {
  async findReferrers(ctx) {
    const { id: userId } = ctx.state.user;

    let data;
    try {
      data = await strapi.service("api::referrer.referrer").referrers(userId);
      data = data
        .filter(({ user }) => !!user)
        .map(({ user }) => user.first_name);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
