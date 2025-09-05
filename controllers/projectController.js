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
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await ProjectService.getProjectById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.createdBy !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this project" });
    }

    const updated = await ProjectService.updateProject(id, { name, description });
    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);

    if (!project) return res.status(404).json({ error: "Project not found" });
    if (project.createdBy !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this project" });
    }
    
    const result = await ProjectService.deleteProject(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};