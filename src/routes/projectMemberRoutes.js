const express = require('express');
const router = express.Router();
const projectMemberController = require('../controllers/projectMemberController');
const authenticate = require('../middleware/authMiddleware');

// POST /api/projects/:projectId/members - Add a member to a project
router.post('/:projectId/members', authenticate, projectMemberController.addMember);
// GET /api/projects/:projectId/members - Get all members of a project
router.get('/:projectId/members', authenticate, projectMemberController.findMembersByProjectId);
// DELETE /api/projects/:projectId/members/:memberId - Remove a member from a
// project
router.delete('/:projectId/members/:memberId', authenticate, projectMemberController.removeMember);
// GET /api/users/:userId/projects - Get all projects a user is part of
router.get('/users/:userId/projects', authenticate, projectMemberController.findProjectsByUserId);

module.exports = router;