import { ObjectSchema } from "joi";

export function validate(params: object, validator: ObjectSchema) {
  let { value, error } = validator.validate(params);
  return { value, error };
}
