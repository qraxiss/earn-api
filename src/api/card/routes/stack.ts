export default {
  routes: [
    {
      method: "POST",
      path: "/stack/start",
      handler: "stack.start",
    },
    {
      method: "GET",
      path: "/stack/status",
      handler: "stack.status",
    },
    {
      method: "POST",
      path: "/stack/claim",
      handler: "stack.claim",
    },
  ],
};
