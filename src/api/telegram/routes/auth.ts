export default {
  routes: [
    {
      method: "POST",
      path: "/telegram/auth",
      handler: "auth.auth",
      config: {
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
  ],
};
