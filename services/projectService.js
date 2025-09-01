const ProjectModel = require("../models/projectModel");
const { v4: uuidv4 } = require("uuid");
class ProjectService {
  static async createProject(data) {
    const project = { id: uuidv4(), ...data };
    return await ProjectModel.create(project);
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