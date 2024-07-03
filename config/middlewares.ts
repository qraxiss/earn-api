export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "global::validator",
  {
    name: "strapi::session",
    config: {
      secure: false,
      httpOnly: false,
    },
  },
  "strapi::favicon",
  "strapi::public",
];
