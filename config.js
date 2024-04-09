const crypto = require("crypto");

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

const jwtSecretKey = generateRandomString(64);
console.log("JWT Secret Key:", jwtSecretKey);
