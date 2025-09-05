const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const UserModel = require("../models/userModel");
const NotificationService = require("./notificationService");

class UserService {

  static async createUser(data) {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) throw new Error("Email already exists");

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({ id,...data, password: hashedPassword });
    await NotificationService.createNotification(
        user.id,  
        "Welcome",
        "Welcome to the app"
      );
    
    return user; 
  }

  static async getAllUsers() {
    return await UserModel.findAll();
  }

  static async getUserById(id) {
    return await UserModel.findById(id);
  }

  static async updateUser(id, data) { 
    const user = await UserModel.update(id, data);
    await NotificationService.createNotification(
        user.id,  
        "ProfileUpdated",
        "Your profile has been updated"
      );
    return user;
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }
}
module.exports = UserService;