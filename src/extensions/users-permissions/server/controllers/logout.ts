export default async (ctx) => {
  ctx.session = {};

  ctx.send({
    data: {
      status: true,
    },
  });
};
