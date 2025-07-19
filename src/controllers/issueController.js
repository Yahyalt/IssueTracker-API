const Issue = require('../models/issueModel');

exports.createIssue = async (req, res) => {
  try {
    const newIssue = await Issue.create({ ...req.body, created_at: new Date(), updated_at: new Date() });
    res.status(201).json(newIssue[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectIssues = async (req, res) => {
  try {
    const issues = await Issue.findAllByProject(req.params.projectId);
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const updated = await Issue.update(req.params.id, { ...req.body, updated_at: new Date() });
    if (!updated.length) return res.status(404).json({ error: 'Issue not found' });
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const deleted = await Issue.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Issue not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
