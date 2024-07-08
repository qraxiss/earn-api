/**
 * A set of functions called "actions" for `webhook`
 */

export default {
  webhook: async (ctx, next) => {
    console.log("body: ", ctx.request.body);
    console.log("headers: ", ctx.request.headers);
    console.log("query: ", ctx.request.query);

    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
};
