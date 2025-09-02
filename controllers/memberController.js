const MemberService = require("../services/memberService");

exports.addMember = async (req, res) => {
  try {
    const member = await MemberService.addMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectMembers = async (req, res) => {
  try {
    const members = await MemberService.getProjectMembers(req.params.projectId);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await MemberService.getUserProjects(req.params.userId);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updated = await MemberService.updateMemberRole(req.params.id, req.body.role);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const result = await MemberService.removeMember(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






