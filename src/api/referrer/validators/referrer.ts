import Joi from "joi";

export default {
  "/refer/register": {
    input: Joi.object({
      referrerCode: Joi.string().required(),
    }),
  },
};
