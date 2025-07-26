const Comment = require("../models/commentModel");
const addComment = async (req, res) => {
    try {
        const { issueId, content } = req.body;
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const comment = await Comment.addComment(issueId, userId, content);
        res.status(201).json(comment[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
const getCommentsByIssueId = async (req, res) => {
    try {
        const comments = await Comment.getCommentsByIssueId(req.params.issueId);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.commentId;
        const updatedComment = await Comment.updateComment(commentId, content);
        if (!updatedComment.length) return res.status(404).json({ error: "Comment not found" });
        res.json(updatedComment[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deleted = await Comment.deleteComment(commentId);
        if (!deleted) return res.status(404).json({ error: "Comment not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    addComment,
    getCommentsByIssueId,
    updateComment,
    deleteComment
};