export default async (ctx) => {
  ctx.session = {};

  ctx.body = {
    data: {
      status: true,
    },
  };
};
