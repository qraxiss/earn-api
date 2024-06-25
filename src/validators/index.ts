import jwt from "../extensions/users-permissions/server/validators";
import card from "../api/card/validators";
import formatValidators from "./format-validators";

const validators = [jwt, card];

export default formatValidators(validators);
