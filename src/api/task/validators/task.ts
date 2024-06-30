import Joi from "joi";

export default {
  "/task/claim": {
    input: Joi.object({
      taskId: Joi.number().required(),
    }),
  },
};
