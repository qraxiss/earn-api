import authStrategy from "./strategies";
export default (register) => {
  return ({ strapi }) => {
    register({ strapi });
    strapi.container.get("auth").register("content-api", authStrategy);
  };
};
