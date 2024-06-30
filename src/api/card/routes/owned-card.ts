export default {
  routes: [
    {
      method: "GET",
      path: "/card/owned-cards",
      handler: "owned-card.ownedCards",
    },
    {
      method: "POST",
      path: "/card/buy",
      handler: "owned-card.buyCard",
    },
    {
      method: "POST",
      path: "/card/upgrade",
      handler: "owned-card.upgradeCard",
    },
  ],
};
