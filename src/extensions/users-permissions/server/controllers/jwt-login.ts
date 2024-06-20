import JWT, { JwtPayload } from "jsonwebtoken";
import { walletInfo } from "../../../../helpers/auth-service";

export default async (ctx, next) => {
  const { jwt } = ctx.request.body;
  const jwtSecret = strapi.config.get(
    "plugin.users-permissions.jwtSecret"
  ) as string;

  try {
    const { address } = JWT.verify(jwt, jwtSecret) as JwtPayload;
    ctx.session = { address };
    console.log(ctx.state.user);
  } catch (error: any) {
    ctx.throw(error.message, 403);
  }
};
