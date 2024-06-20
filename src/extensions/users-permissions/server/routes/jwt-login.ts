export default {
  method: "POST",
  path: "/auth/jwt",
  handler: "auth.jwt",
  config: {
    middlewares: ["plugin::users-permissions.rateLimit"],
    prefix: "",
  },
};
