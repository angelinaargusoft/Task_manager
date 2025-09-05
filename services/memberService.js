const MemberModel = require("../models/memberModel");
const NotificationService = require("./notificationService");
const { v4: uuidv4 } = require("uuid");
class MemberService {
  static async addMember(data) {
    const member = { id: uuidv4(), ...data };
    const newMember = await MemberModel.add(member);
    // Get all project members
    const members = await MemberModel.findByProject(data.project_id);
    for (const m of members) {
      if (m.user_id === data.user_id) {
        // Notify the newly added member
        await NotificationService.createNotification(
          m.user_id,
          "MemberAdded",
          `You have been added to project ${data.project_id} with role: ${data.role}`
        );
      } else {
        // Notify existing members
        await NotificationService.createNotification(
          m.user_id,
          "MemberJoined",
          `A new member has joined your project ${data.project_id} with role: ${data.role}`
        );
      }
    }
    return newMember;
  }
  static async updateMemberRole(id, role) {
    await MemberModel.updateRole(id, role);
    const member = await MemberModel.findById(id);
    // Get all project members
    const members = await MemberModel.findByProject(member.project_id);
    for (const m of members) {
      if (m.user_id === member.user_id) {
        // Notify the member whose role changed
        await NotificationService.createNotification(
          m.user_id,
          "RoleChanged",
          `Your role in project ${member.project_id} has been changed to: ${role}`
        );
      } else {
        // Notify others
        await NotificationService.createNotification(
          m.user_id,
          "MemberRoleUpdated",
          `Member ${member.user_id}'s role in project ${member.project_id} has been updated to: ${role}`
        );
      }
    }
    return { id, role };
  }
  static async removeMember(id) {
    const member = await MemberModel.findById(id);
    await MemberModel.remove(id);
    // Get remaining project members
    const members = await MemberModel.findByProject(member.project_id);
    for (const m of members) {
      if (m.user_id === member.user_id) {
        // Notify the removed member
        await NotificationService.createNotification(
          m.user_id,
          "MemberRemoved",
          `You have been removed from project ${member.project_id}`
        );
      } else {
        // Notify others
        await NotificationService.createNotification(
          m.user_id,
          "MemberLeft",
          `A member has been removed from project ${member.project_id}`
        );
      }
    }
    return { message: "Member removed successfully" };
  }
  static async getProjectMembers(project_id) {
    return await MemberModel.findByProject(project_id);
  }
  static async getUserProjects(user_id) {
    return await MemberModel.findByUser(user_id);
  }
}
module.exports = MemberService;






