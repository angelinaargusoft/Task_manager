const ProjectModel = require("../models/projectModel");
const MemberModel = require("../models/memberModel");
const NotificationService = require("./notificationService");
const { v4: uuidv4 } = require("uuid");
class ProjectService {
  static async createProject(data) {
    //Create the project
    const project = { id: uuidv4(), ...data };

    await ProjectModel.create(project);
    //Add the creator as a member with role "Admin"
    const member = {
      id: uuidv4(),
      project_id: project.id,
      user_id: project.createdBy,
      role: "Admin",
    };
 
    await MemberModel.add(member);

    await NotificationService.createNotification(
      data.createdBy,
      "ProjectCreated",
      `You created a new project: ${data.name}`
    );
    return project;
  }

  static async getAllProjects() {
    return await ProjectModel.findAll();
  }

  static async getProjectById(id) {
    return await ProjectModel.findById(id);
  }

  static async updateProject(id, data) {
    await ProjectModel.update(id, data);
    const members = await MemberModel.findByProject(id);
    for (const member of members) {
      await NotificationService.createNotification(
        member.user_id,
        "ProjectUpdated",
        `Project "${data.name}" has been updated.`
      );
      return { id, ...data };
    }
  }
  
  static async deleteProject(id) {
    const members = await MemberModel.findByProject(id);
    const project = await ProjectModel.findById(id);

    await ProjectModel.delete(id);
    for (const member of members) {
      await NotificationService.createNotification(
        member.user_id,
        "ProjectDeleted",
        `Project "${project.name}" has been deleted.`
      );
    }

    return { message: "Project deleted successfully" };
  }
}

module.exports = ProjectService;