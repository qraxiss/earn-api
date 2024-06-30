/**
 * task router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/task/status",
      handler: "task.status",
    },
    {
      method: "POST",
      path: "/task/claim",
      handler: "task.claim",
    },
  ],
};
