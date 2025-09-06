const MemberService = require("../services/memberService");
const MemberModel = require("../models/memberModel");

exports.checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;

        let projectId = req.body?.project_id || req.query.project_id;
        // Special case for update/remove: get projectId from memberId (req.params.id)
        if (!projectId && req.params?.id) {
            const urlPath = req.originalUrl;
            if (urlPath.startsWith("/api/projects")) {
                projectId = req.params.id;
                console.log(projectId);
            }
            else {
                const member = await MemberModel.findById(req.params.id);

                if (!member) {
                    return res.status(404).json({ message: "Member not found" });
                }
                projectId = member.project_id;
            }
        }
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        const adminMember = await MemberService.findByUserAndProject(userId, projectId);
        if (!adminMember || adminMember.role !== "Admin") {
            return res.status(403).json({ message: "You must be an admin of this project" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};









