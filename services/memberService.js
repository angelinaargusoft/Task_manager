const MemberModel = require("../models/memberModel");
const { v4: uuidv4 } = require("uuid");
class MemberService {
  static async addMember(data) {
    const member = { id: uuidv4(), ...data };
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
    return { id, role };
  }
  static async removeMember(id) {
    await MemberModel.remove(id);
    return { message: "Member removed successfully" };
  }
}
module.exports = MemberService;






