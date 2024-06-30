import Joi from "joi";

export default {
  "/card/owned-cards": {
    input: null,
    output: null,
    query: null,
  },

  "/card/buy": {
    input: Joi.object({
      cardId: Joi.number().required(),
    }),
    output: null,
    query: null,
  },

  "/card/upgrade": {
    input: Joi.object({
      cardId: Joi.number().required(),
    }),
    output: null,
    query: null,
  },
};
