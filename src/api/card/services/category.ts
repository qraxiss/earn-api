import { Strapi } from "@strapi/strapi";
export default ({ strapi }: { strapi: Strapi }) => ({
  async cardsByCategory() {
    return await strapi.entityService.findMany("api::card.card-category", {
      populate: {
        cards: true,
      },
    });
  },
});
