import controllers from "./controllers";
import routes from "./routes";

import authStrategy from "./strategies";

export default (plugin) => {
  plugin.controllers.auth = { ...plugin.controllers.auth, ...controllers };
  plugin.routes["content-api"].routes = [
    ...plugin.routes["content-api"].routes,
    ...routes,
  ];

  strapi.container.get("auth").register("content-api", authStrategy);

  return plugin;
};
