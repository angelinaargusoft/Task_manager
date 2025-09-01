const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1h"; 

class AuthService {

  static async register({ first_name, last_name, email, password }) {
    // Check if user exists
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Email already in use");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    return await UserModel.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
  }

  static async login({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid email or password");
    // Sign JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return { token, user: { id: user.id, email: user.email, first_name: user.first_name } };
  }
}

module.exports = AuthService;