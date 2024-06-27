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
  ],
};
