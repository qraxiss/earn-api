/**
 * daily router
 */

export default {
  routes: [
    {
      method: "POST",
      path: "/daily/login/claim",
      handler: "claim-login.claim",
    },
    {
      method: "GET",
      path: "/daily/login/status",
      handler: "claim-login.status",
    },
    {
      method: "GET",
      path: "/daily/login/days",
      handler: "claim-login.days",
    },
  ],
};
