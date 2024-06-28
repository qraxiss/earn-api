/**
 * referer router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/refer/code",
      handler: "referrer.referrerCode",
    },
    {
      method: "POST",
      path: "/refer/register",
      handler: "referrer.referrerUser",
    },
    {
      method: "GET",
      path: "/refer/referrers",
      handler: "referrer.findReferrers",
    },
  ],
};
