/**
 * task service
 */

import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async claim(userId, taskId) {
    let { claimedTask, isClaimed } = await strapi
      .service("api::task.task")
      .status(userId, taskId);

    if (isClaimed) {
      throw new Error("You already claimed this task!");
    }

    claimedTask = await strapi.entityService.create("api::task.claimed-task", {
      data: {
        userId,
        taskId,
      },
    });

    const task = await strapi.entityService.findOne("api::task.task", taskId);

    return await strapi
      .service("api::xp.xp")
      .increaseByUserId(userId, task.reward);
  },

  async status(userId, taskId) {
    let claimedTask = await strapi.db.query("api::task.claimed-task").findOne({
      where: {
        userId,
        taskId,
      },
    });
    const isClaimed = !!claimedTask;

    return {
      isClaimed,
      task: await strapi.entityService.findOne("api::task.task", taskId),
    };
  },

  async allStatus(userId) {
    const tasks = await strapi.entityService.findMany("api::task.task");

    return await Promise.all(
      tasks.map(
        async (task) =>
          await strapi.service("api::task.task").status(userId, task.id)
      )
    );
  },
});
