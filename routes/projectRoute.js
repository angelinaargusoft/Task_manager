const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticate } = require("../middlewares/authMiddleware");
// CRUD Routes
router.post("/", authenticate, projectController.createProject);
router.get("/", authenticate, projectController.getProjects);
router.get("/:id", authenticate,projectController.getProjectById);
router.put("/:id", authenticate, projectController.updateProject);
router.delete("/:id", authenticate, projectController.deleteProject);
module.exports = router;