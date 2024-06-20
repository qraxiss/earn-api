export default {
  method: "POST",
  path: "/auth/logout",
  handler: "auth.logout",
  config: {
    middlewares: ["plugin::users-permissions.rateLimit"],
    prefix: "",
  },
};
