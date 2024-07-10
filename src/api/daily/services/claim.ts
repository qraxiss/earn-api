import { Strapi } from "@strapi/strapi";
import moment from "moment";

export default ({ strapi }: { strapi: Strapi }) => ({
  info(hour: number) {
    const today = new Date();
    // yesterday.setUTCHours(0, 0, 0, 0);
    const currentTime = moment(today);
    today.setHours(hour, 0, 0, 0);

    const yesterday = new Date(today.getTime() - 60 * 60 * 24 * 1000);
    const tomorrow = new Date(today.getTime() + 60 * 60 * 24 * 1000);
    return {
      today: moment(today),
      yesterday: moment(yesterday),
      tomorrow: moment(tomorrow),
      currentTime,
    };
  },
});
