import Joi from "joi";

export default {
  input: Joi.object({
    initData: Joi.string().required(),
  }),
};
