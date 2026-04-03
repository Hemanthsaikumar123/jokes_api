import crypto from "crypto";

export const generateApiKey = () => {
  return "jk_live_" + crypto.randomBytes(24).toString("hex");
};