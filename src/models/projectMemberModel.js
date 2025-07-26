const db =  require('../config/db');
const ProjectMember = {
  async addMember(projectId, userId) {
    return db('project_members').insert({ 
      project_id: projectId, 
      user_id: userId 
    }).returning('*');
  },

  // ADD THIS MISSING METHOD
  async removeMember(projectId, userId) {
    return db('project_members')
      .where({ project_id: projectId, user_id: userId })
      .del();
  },
  
  async findMembersByProjectId(projectId) {
    return db('project_members')
      .join('users', 'project_members.user_id', 'users.id')
      .where({ project_id: projectId })
      .select('users.id', 'users.name', 'users.email', 'users.role');
  },
  
  // Add helper methods
  async isMember(projectId, userId) {
    const result = await db('project_members')
      .where({ project_id: projectId, user_id: userId })
      .first();
    return !!result;
  }
};
module.exports = ProjectMember;