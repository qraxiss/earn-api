/**
 * task controller
 */

export default {
  async status(ctx) {
    const { id: userId } = ctx.state.user;

    let data;
    try {
      data = await strapi.service("api::task.task").allStatus(userId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },

  async claim(ctx) {
    const { id: userId } = ctx.state.user;
    const { taskId } = ctx.request.body;

    let data;
    try {
      data = await strapi.service("api::task.task").claim(userId, taskId);
    } catch (error: any) {
      ctx.throw(error.message, 400);
    }

    ctx.send({
      data,
    });
  },
};
