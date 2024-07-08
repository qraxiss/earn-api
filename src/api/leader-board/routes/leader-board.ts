export default {
  routes: [
    {
      method: "GET",
      path: "/leader-board/ranks",
      handler: "leader-board.ranks",
    },
    {
      method: "GET",
      path: "/leader-board/stats",
      handler: "leader-board.stats",
    },
  ],
};
