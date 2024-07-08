import jwt from "../extensions/users-permissions/server/validators";
import card from "../api/card/validators";
import referrer from "../api/referrer/validators";
import task from "../api/task/validators";
import telegram from "../api/telegram/validators";

import formatValidators from "./format-validators";

const validators = [jwt, card, referrer, task, telegram];

export default formatValidators(validators);
