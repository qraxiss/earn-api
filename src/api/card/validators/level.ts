import Joi from "joi";

export default {
  "/level/calculate": {
    input: Joi.object({
      cardId: Joi.number().required(),
      level: Joi.number().required(),
    }),
  },
};
