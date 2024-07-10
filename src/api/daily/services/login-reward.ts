import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findOrderedDays() {
    const days = await strapi.entityService.findMany(
      "api::daily.login-reward",
      {
        sort: {
          day: "asc",
        },
      }
    );

    return days;
  },
});
