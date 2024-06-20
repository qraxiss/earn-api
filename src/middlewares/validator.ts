/**
 * `validator` middleware
 */

import { Strapi } from "@strapi/strapi";
import { validate } from "../helpers/validate";
import validators from "../validators";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const validator = validators[ctx.originalUrl];

    if (!validator) {
      await next();
      return;
    }

    if (validator.input) {
      const { error, value } = validate(ctx.request.body, validator.input);

      if (error) {
        ctx.throw(error.message, 400);
      }

      ctx.request.body = value;
    }

    if (validator.output) {
      const { error, value } = validate(ctx.body, validator.output);

      if (error) {
        ctx.throw(error.message, 400);
      }

      ctx.body = value;
    }

    await next();
  };
};
