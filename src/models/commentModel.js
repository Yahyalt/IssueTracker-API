const db =  require('../config/db');
const Comment = {
    async addComment(issueId, userId, content) {
        return db('comments').insert({
            issue_id: issueId,
            author_id: userId,
            content: content,
            created_at: new Date(),
            updated_at: new Date()
        }).returning('*');
    },
    async getCommentsByIssueId(issueId) {
        return db('comments')
            .where({ issue_id: issueId })
            .join('users', 'comments.author_id', 'users.id')
            .select('comments.*', 'users.name as user_name');
    },
    async updateComment(commentId, content) {
        return db('comments')
            .where({ id: commentId })
            .update({ content, updated_at: new Date() })
            .returning('*');
    },
    async deleteComment(commentId) {
        return db('comments')
            .where({ id: commentId })
            .del();
    },
};

module.exports = Comment;