const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", memberController.addMember);                        // Add member
router.get("/project/:projectId", memberController.getProjectMembers); // List members of project
router.get("/user/:userId", memberController.getUserProjects);        // List projects of a user
router.put("/:id", memberController.updateRole);                 // Update role
router.delete("/:id", memberController.removeMember);                 // Remove member

module.exports = router;