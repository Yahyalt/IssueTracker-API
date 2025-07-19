const Project = require("../models/ProjectModel");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      created_by: req.user.id, // 👈 override to ensure correct user
      created_at: new Date(),
      updated_at: new Date(),
    });
    res.status(201).json(project[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findByUserId(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateProject = async (req, res) => {
  try {
    const updated = await Project.update(req.params.id, {
      ...req.body,
      updated_at: new Date(),
    });
    if (!updated.length)
      return res.status(404).json({ error: "Project not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({
      message: "Project deleted successfully",
      projectId: deleted._id
    }).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
