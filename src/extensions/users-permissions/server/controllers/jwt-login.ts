import JWT, { JwtPayload } from "jsonwebtoken";
import { info } from "../../../../services/auth";

export default async (ctx, next) => {
  const { jwt } = ctx.request.body;
  const jwtSecret = strapi.config.get(
    "plugin.users-permissions.jwtSecret"
  ) as string;

  try {
    const { id } = JWT.verify(jwt, jwtSecret) as JwtPayload;
    console.log(id);
    try {
      await info(id);
    } catch (error: any) {
      ctx.throw(error.response.data.error.message, 403);
    }
    ctx.session = { id };
    ctx.body = {
      data: {
        success: true,
      },
    };
  } catch (error: any) {
    ctx.throw(error.message, 403);
  }
};
