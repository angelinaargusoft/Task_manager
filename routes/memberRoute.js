const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const { authenticate } = require("../middlewares/authMiddleware");
const {checkAdmin} = require("../middlewares/checkAdmin")

router.post("/", authenticate, checkAdmin, memberController.addMember);                        // Add member
router.get("/project/:projectId", authenticate, memberController.getProjectMembers); // List members of project
router.get("/user/:userId", authenticate, memberController.getUserProjects);        // List projects of a user
router.put("/:id", authenticate, checkAdmin, memberController.updateRole);                 // Update role
router.delete("/:id", authenticate, checkAdmin, memberController.removeMember);                 // Remove member

module.exports = router;