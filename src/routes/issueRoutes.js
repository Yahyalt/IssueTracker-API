const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// POST /api/issues - Create new issue
router.post('/', issueController.createIssue);

// GET /api/issues/:id - Get a specific issue by ID
router.get('/:id', issueController.getIssue);

// GET /api/issues/project/:projectId - Get all issues under a project
router.get('/project/:projectId', issueController.getProjectIssues);

// PUT /api/issues/:id - Update an issue
router.put('/:id', issueController.updateIssue);

// DELETE /api/issues/:id - Delete an issue
router.delete('/:id', issueController.deleteIssue);

module.exports = router;
