const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

class UserService {

  static async register(data) {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) throw new Error("Email already exists");
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await UserModel.create({ ...data, password: hashedPassword });
  }

  static async login({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, first_name: user.first_name } };
  }

  static async getAllUsers() {
    return await UserModel.findAll();
  }

  static async getUserById(id) {
    return await UserModel.findById(id);
  }

  static async updateUser(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await UserModel.update(id, data);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }
}
module.exports = UserService;