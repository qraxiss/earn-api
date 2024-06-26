import Joi from "joi";

export default {
  "/owned-card/owned-cards": {
    input: null,
    output: null,
    query: null,
  },

  "/owned-card/buy-card": {
    input: Joi.object({
      cardId: Joi.number().required(),
    }),
    output: null,
    query: null,
  },

  "/owned-card/upgrade-card": {
    input: Joi.object({
      cardId: Joi.number().required(),
    }),
    output: null,
    query: null,
  },
};
