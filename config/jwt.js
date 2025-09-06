module.exports = {
  accessTokenSecret: process.env.JWT_SECRET || "supersecret",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "refreshsupersecret",
  accessTokenExpiry: "1h",
  refreshTokenExpiry: "7d"
};