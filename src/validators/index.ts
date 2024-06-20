import jwt from "../extensions/users-permissions/server/validators";
import formatValidators from "./format-validators";

const validators = [jwt];

export default formatValidators(validators);
