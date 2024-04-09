import Token from "../database/models/tokenModel";

export async function saveToken(userId: string, token: string) {
  await Token.create({ userId, token });
}

export async function checkTokenExists(token: string) {
  return await Token.findOne({ token });
}
