import Joi from "joi";

export default {
  input: Joi.object({
    jwt: Joi.string().required(),
  }),
  output: null,
};
