/**
 * daily router
 */

export default {
  routes: [
    {
      method: "POST",
      path: "/daily/claim",
      handler: "daily.claim",
    },
    {
      method: "GET",
      path: "/daily/status",
      handler: "daily.status",
    },
    {
      method: "GET",
      path: "/daily/days",
      handler: "daily.days",
    },
  ],
};
