const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticate } = require("../middlewares/authMiddleware");
const {checkAdmin} = require("../middlewares/checkAdmin");

router.post("/", projectController.createProject);
router.get("/", authenticate, projectController.getProjects);
router.get("/:id", authenticate, projectController.getProjectById);
router.put("/:id", authenticate, checkAdmin, projectController.updateProject);
router.delete("/:id", authenticate, checkAdmin, projectController.deleteProject);

module.exports = router;