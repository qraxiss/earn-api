import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findOrderedDays() {
    const days = await strapi.entityService.findMany("api::daily.daily-reward");

    return days.sort(({ day: dayA }, { day: dayB }) => dayA - dayB);
  },
});
