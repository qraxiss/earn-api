import Joi from "joi";

export default {
  input: Joi.object({
    cardId: Joi.number().required(),
    level: Joi.number().required(),
  }),
};
