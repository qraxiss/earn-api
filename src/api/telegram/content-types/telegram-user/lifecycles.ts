function isID(n: any): boolean {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

export default {
  async afterCreate(event) {
    if (isID(event.params.data.user)) {
      return;
    } else if (
      event.params.data.user &&
      event.params.data.user.connect.length !== 0
    ) {
      return;
    }

    await strapi.db.query("plugin::users-permissions.user").create({
      data: {
        telegram_user: event.result.id,
        role: [1],
      },
    });
  },
};
