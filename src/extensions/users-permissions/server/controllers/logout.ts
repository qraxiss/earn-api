export default async (ctx) => {
  console.log(ctx.state.user);

  ctx.session = {};

  ctx.body = {
    data: {
      status: true,
    },
  };
};
