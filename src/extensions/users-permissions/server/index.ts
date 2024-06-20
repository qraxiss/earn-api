import myControllers from "./controllers";
import myRoutes from "./routes";

import authStrategy from "./strategies";

export default (plugin) => {
  plugin.controllers.auth = { ...plugin.controllers.auth, ...myControllers };
  plugin.routes["content-api"].routes = [
    ...plugin.routes["content-api"].routes,
    ...myRoutes,
  ];

  strapi.container.get("auth").register("content-api", authStrategy);

  return plugin;
};

// export default (plugin) => {
//   console.log(plugin);

//   return {
//     register,
//   };
// };
