export default {
  routes: [
    {
      method: "POST",
      path: "/telegram",
      handler: "telegram.webhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
