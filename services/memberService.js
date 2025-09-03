const MemberModel = require("../models/memberModel");
const NotificationService = require("./notificationService");

const { v4: uuidv4 } = require("uuid");
class MemberService {

  static async addMember(data) {
    const member = { id: uuidv4(), ...data };
    // Notify the user that they were added
    await NotificationService.createNotification(
      data.user_id,
      "MemberAdded",
      `You have been added to project ${data.project_id} with role: ${data.role}`
    );

    return await MemberModel.add(member);
  }

  static async getProjectMembers(project_id) {
    return await MemberModel.findByProject(project_id);
  }

  static async getUserProjects(user_id) {
    return await MemberModel.findByUser(user_id);
  }

  static async updateMemberRole(id, role) {
    await MemberModel.updateRole(id, role);

    const member = await MemberModel.findById(id);
    console.log(member);
    await NotificationService.createNotification(
      member.user_id,
      "RoleChanged",
      `Your role in project ${member.project_id} has been changed to: ${role}`
    );
    
    return { id, role };
  }
  
  static async removeMember(id) {
    
    const member = await MemberModel.findById(id);
    await MemberModel.remove(id);
    await NotificationService.createNotification(
      member.user_id,
      "MemberRemoved",
      `You have been removed from project ${member.project_id}`
    );
    return { message: "Member removed successfully" };
  }
}
module.exports = MemberService;






