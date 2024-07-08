/**
 * telegram-user service
 */

import crypto from "crypto";
import { config } from "dotenv";
config();

const WEB_APP_DATA_CONST = "WebAppData";

function encodeHmac(message, key, repr = undefined) {
  return crypto.createHmac("sha256", key).update(message).digest(repr);
}

function parseTelegramInitData(initData: string) {
  const searchParams = new URLSearchParams(initData);
  const hash = searchParams.get("hash");
  searchParams.delete("hash");

  const restKeys = Array.from(searchParams.entries());
  restKeys.sort(([aKey, aValue], [bKey, bValue]) => aKey.localeCompare(bKey));

  const dataCheckString = restKeys.map(([n, v]) => `${n}=${v}`).join("\n");

  return {
    dataCheckString,
    hash,
    metaData: {
      user: {
        ...JSON.parse(searchParams.get("user")),
        start_param: searchParams.get("start_param"),
      },
      auth_date: searchParams.get("auth_date"),
      query_id: searchParams.get("query_id"),
    },
  };
}

export default () => ({
  async auth(initData: string) {
    const authTelegramData = parseTelegramInitData(initData);
    console.log(process.env.BOT_TOKEN);
    const secretKey = encodeHmac(process.env.BOT_TOKEN, WEB_APP_DATA_CONST);

    const validationKey = encodeHmac(
      authTelegramData.dataCheckString,
      secretKey,
      "hex"
    );

    if (validationKey !== authTelegramData.hash) {
      throw new Error("Validation failure. Bot token or initData not correct.");
    }
    const user = authTelegramData.metaData.user;

    return {
      telegram_id: user.id,
      username: user.username,
      last_name: user.last_name,
      first_name: user.first_name,
      start_param: user.start_param,
    };
  },
});
