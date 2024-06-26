export default {
  routes: [
    {
      method: "GET",
      path: "/owned-card/owned-cards",
      handler: "owned-card.ownedCards",
    },
    {
      method: "POST",
      path: "/owned-card/buy-card",
      handler: "owned-card.buyCard",
    },
    {
      method: "POST",
      path: "/owned-card/upgrade-card",
      handler: "owned-card.upgradeCard",
    },
  ],
};
