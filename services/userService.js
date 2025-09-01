const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const UserModel = require("../models/userModel");

class UserService {

  static async createUser(data) {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) throw new Error("Email already exists");
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await UserModel.create({ id,...data, password: hashedPassword });
  }

  // static async login({ email, password }) {
  //   const user = await UserModel.findByEmail(email);
  //   if (!user) throw new Error("Invalid credentials");
  //   const valid = await bcrypt.compare(password, user.password);
  //   if (!valid) throw new Error("Invalid credentials");
  //   const token = jwt.sign(
  //   { id: user.id, email: user.email }, 
  //   process.env.JWT_SECRET,              
  //   { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  // );
  //   return { token, user: { id: user.id, email: user.email, first_name: user.first_name } };
  // }

  static async getAllUsers() {
    return await UserModel.findAll();
  }

  static async getUserById(id) {
    return await UserModel.findById(id);
  }

  static async updateUser(id, data) { 
    return await UserModel.update(id, data);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }
}
module.exports = UserService;