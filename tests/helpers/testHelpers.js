const testDb = require('../setup/testDb');
const { hashPassword } = require('../../src/utils/hash');

const testHelpers = {
  // Create a test user
  async createTestUser(userData = {}) {
    const defaultUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: await hashPassword('password123'),
      role: 'tester'
    };
    
    const user = { ...defaultUser, ...userData };
    const [newUser] = await testDb('users').insert(user).returning('*');
    return newUser;
  },

  // Create a test project
  async createTestProject(projectData = {}, userId) {
    const defaultProject = {
      name: 'Test Project',
      description: 'Test project description',
      created_by: userId,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const project = { ...defaultProject, ...projectData };
    const [newProject] = await testDb('projects').insert(project).returning('*');
    return newProject;
  },

  // Create a test issue
  async createTestIssue(issueData = {}, projectId) {
    const defaultIssue = {
      title: 'Test Issue',
      description: 'Test issue description',
      status: 'open',
      priority: 'medium',
      project_id: projectId,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const issue = { ...defaultIssue, ...issueData };
    const [newIssue] = await testDb('issues').insert(issue).returning('*');
    return newIssue;
  }
};

module.exports = testHelpers; 