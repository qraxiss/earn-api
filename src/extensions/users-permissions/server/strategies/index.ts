import { castArray, map, every, pipe } from "lodash/fp";
import { errors } from "@strapi/utils";
const { ForbiddenError, UnauthorizedError } = errors;
import { Context } from "koa"; // Assuming Koa is used for the context
import {
  info,
  publicPermissions as getPublicPermissions,
} from "../../../../services/auth";

const PERMISSONS = [
  { action: "plugin::users-permissions.user.me" },
  { action: "plugin::users-permissions.auth.changePassword" },
  { action: "plugin::users-permissions.auth.jwt" },
  { action: "api::referrer.referrer.findReferrers" },
  { action: "api::card.card.cards" },
  { action: "api::card.owned-card.buyCard" },
  { action: "api::card.stack.start" },
  { action: "api::card.stack.claim" },
  { action: "api::card.owned-card.upgradeCard" },
  { action: "api::card.owned-card.ownedCards" },
  { action: "api::card.stack.status" },
  { action: "api::xp.xp.xp" },
  { action: "api::task.task.claim" },
  { action: "api::task.task.status" },
  { action: "api::leader-board.leader-board.ranks" },
  { action: "api::leader-board.leader-board.stats" },
  { action: "api::daily.claim-login.days" },
  { action: "api::daily.claim-login.claim" },
  { action: "api::daily.claim-login.status" },
  { action: "api::daily.claim-question.claim" },
  { action: "api::daily.claim-question.status" },
  { action: "api::daily.claim-card.claim" },
  { action: "api::daily.claim-card.status" },
  { action: "api::daily.claim-question.question" },
];

const PUBLIC = [
  { action: "api::telegram.auth.auth" },
  { action: "api::telegram.webhook.webhook" },
];
// Define types for user, token, and settings
interface User {
  address: string;
  role: {
    id: string;
  };
}

interface Auth {
  authenticated: boolean;
  credentials: User | null;
  ability: any;
  error?: string;
}

interface Config {
  scope?: string | string[];
}

const authenticate = async (ctx: Context): Promise<Auth> => {
  try {
    const token = await strapi
      .plugin("users-permissions")
      .service("jwt")
      .getToken(ctx);

    if (token) {
      const { id } = token;

      const ability =
        await strapi.contentAPI.permissions.engine.generateAbility(PERMISSONS);

      ctx.state.user = { id };

      return {
        authenticated: true,
        credentials: { id } as any,
        ability,
      };
    }

    const ability = await strapi.contentAPI.permissions.engine.generateAbility(
      PUBLIC
    );

    return {
      authenticated: true,
      credentials: null,
      ability,
    };
  } catch (err) {
    return { authenticated: false, credentials: null, ability: null };
  }
};

const verify = async (auth: Auth, config: Config): Promise<void> => {
  const { credentials: user, ability } = auth;
  if (!config.scope) {
    if (!user) {
      // A non authenticated user cannot access routes that do not have a scope
      throw new UnauthorizedError();
    } else {
      // An authenticated user can access non scoped routes
      return;
    }
  }

  // If no ability has been generated, then consider auth is missing
  if (!ability) {
    throw new UnauthorizedError();
  }

  const isAllowed = pipe(
    // Make sure we're dealing with an array
    castArray,
    // Transform the scope array into an action array
    every((scope: string) => ability.can(scope))
  )(config.scope);

  if (!isAllowed) {
    throw new ForbiddenError();
  }
};

export default {
  name: "users-permissions",
  authenticate,
  verify,
};
