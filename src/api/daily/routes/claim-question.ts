/**
 * daily router
 */

export default {
  routes: [
    {
      method: "POST",
      path: "/daily/question/claim",
      handler: "claim-question.claim",
    },
    {
      method: "GET",
      path: "/daily/question/status",
      handler: "claim-question.status",
    },
  ],
};
