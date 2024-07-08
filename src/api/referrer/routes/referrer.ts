/**
 * referer router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/refer/referrers",
      handler: "referrer.findReferrers",
    },
  ],
};
