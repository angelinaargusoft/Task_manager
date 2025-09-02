const ProjectModel = require("../models/projectModel");
const MemberModel = require("../models/memberModel")
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
      user_id: data.createdBy,   // assuming created_by is passed from controller
      role: "Admin",
    };
    await MemberModel.add(member);
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
    return { id, ...data };
  }

  static async deleteProject(id) {
    await ProjectModel.delete(id);
    return { message: "Project deleted successfully" };
  }
}

module.exports = ProjectService;