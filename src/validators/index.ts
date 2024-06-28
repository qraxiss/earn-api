import jwt from "../extensions/users-permissions/server/validators";
import card from "../api/card/validators";
import referrer from "../api/referrer/validators";
import formatValidators from "./format-validators";

const validators = [jwt, card, referrer];

export default formatValidators(validators);
