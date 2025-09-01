const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const userService = require("../services/userService");
const jwtConfig = require("../config/jwt");

const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { first_name, last_name, email, password } = req.body;
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) return res.status(400).json({ error: "User already exists" });
    const newUser = await userService.createUser({ first_name, last_name, email, password });
    //console.log(newUser)
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });
    const accessToken = jwt.sign({ id: user.id, email: user.email }, jwtConfig.accessTokenSecret, {
      expiresIn: jwtConfig.accessTokenExpiry
    });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpiry
    });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: "Refresh token required" });
    jwt.verify(refreshToken, jwtConfig.refreshTokenSecret, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid or expired refresh token" });
      // issue new access token
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.accessTokenExpiry }
      );
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { register, login, refreshToken };