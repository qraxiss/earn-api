export default {
  routes: [
    {
      method: "POST",
      path: "/webhook",
      handler: "webhook.webhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
