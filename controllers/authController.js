const AuthService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { token, user } = await AuthService.login(req.body);
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};