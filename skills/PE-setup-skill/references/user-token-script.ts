import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://platform-us.plaud.ai/developer/api";

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

async function main(): Promise<void> {
  const clientId = requireEnv("PLAUD_CLIENT_ID");
  const secretKey = requireEnv("PLAUD_SECRET_KEY");
  const userId = requireEnv("PLAUD_USER_ID");

  const basicAuth = Buffer.from(`${clientId}:${secretKey}`).toString("base64");

  console.error("Step 1: Fetching partner access token...");
  const partnerRes = await fetch(`${BASE_URL}/oauth/partner/access-token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const partnerData = (await partnerRes.json()) as {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };

  if (!partnerRes.ok) {
    console.error(`Partner token error ${partnerRes.status}:`, JSON.stringify(partnerData));
    process.exit(1);
  }

  console.error(`Partner token received (expires in ${partnerData.expires_in}s)`);

  console.error("Step 2: Fetching user access token...");
  const userRes = await fetch(`${BASE_URL}/open/partner/users/access-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${partnerData.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, expires_in: 86400 }),
  });

  const userData = (await userRes.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  if (!userRes.ok) {
    console.error(`User token error ${userRes.status}:`, JSON.stringify(userData));
    process.exit(1);
  }

  console.error(`User token received (expires in ${userData.expires_in}s)`);
  console.log(userData.access_token);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
