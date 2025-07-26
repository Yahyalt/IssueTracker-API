const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/authMiddleware');

// POST /api/comments - Create a new comment
router.post('/', authenticate, commentController.addComment);
// GET /api/comments/issue/:issueId - Get all comments for a specific issue
router.get('/issue/:issueId', authenticate, commentController.getCommentsByIssueId);
// PUT /api/comments/:id - Update a comment
router.put('/:id', authenticate, commentController.updateComment);
// DELETE /api/comments/:id - Delete a comment
router.delete('/:id', authenticate, commentController.deleteComment);
module.exports = router;
