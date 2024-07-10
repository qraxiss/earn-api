/**
 * daily router
 */

export default {
  routes: [
    {
      method: "POST",
      path: "/daily/card/claim",
      handler: "claim-card.claim",
    },
    {
      method: "GET",
      path: "/daily/card/status",
      handler: "claim-card.status",
    },
  ],
};
