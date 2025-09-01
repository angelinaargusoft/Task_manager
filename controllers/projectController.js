const ProjectService = require("../services/projectService");
exports.createProject = async (req, res) => {
  try {
    const project = await ProjectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProject = async (req, res) => {
  try {
    const updated = await ProjectService.updateProject(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const result = await ProjectService.deleteProject(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};