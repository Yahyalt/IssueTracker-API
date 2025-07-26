const ProjectMember = require("../models/projectMemberModel");

const addMember = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { userId } = req.body;
    
    // TODO: Add validation
    // 1. Check if project exists
    // 2. Check if user exists  
    // 3. Check if current user can add members (is owner/admin)
    // 4. Check if user is already a member
    
    const member = await ProjectMember.addMember(projectId, userId);
    res.status(201).json(member[0]);
  } catch (err) {
    // Handle duplicate member error specifically
    if (err.constraint === 'project_members_project_id_user_id_unique') {
      return res.status(409).json({ error: "User is already a member of this project" });
    }
    res.status(500).json({ error: err.message });
  }
}
const removeMember = async (req, res) => {
  try {
    const projectId = req.params.projectId;   // From URL
    const memberId = req.params.memberId;     // From URL (user_id)
    const result = await ProjectMember.removeMember(projectId, memberId);
    if (!result) return res.status(404).json({ error: "Member not found" });
    res.status(200).json({ message: "Member removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const findMembersByProjectId = async (req, res) => {
    try {
        const members = await ProjectMember.findMembersByProjectId(req.params.projectId);
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
const findProjectsByUserId = async (req, res) => {
    try {
        const projects = await ProjectMember.findProjectsByUserId(req.params.userId);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  addMember,
  removeMember,
  findMembersByProjectId,
  findProjectsByUserId
};