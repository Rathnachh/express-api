// import { randomBytes } from "crypto";

// export function generateEmailVerificationToken(userId: string): string {
//   return randomBytes(32).toString("hex");
// }

import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
const tokenExpiration = process.env.TOKEN_EXPIRATION || "1m"; // Default expiration time is 1 minute

export function generateEmailVerificationToken(userId: string, expiresIn: string = tokenExpiration): string {
  return jwt.sign({ userId }, secretKey, { expiresIn });
}
