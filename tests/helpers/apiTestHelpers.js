const request = require('supertest');
const app = require('../../src/app');
const { generateToken } = require('../../src/utils/token');

const apiHelpers = {
  // Make authenticated request
  async authenticatedRequest(method, url, user, data = {}) {
    const token = generateToken(user);
    const req = request(app)[method](url)
      .set('Authorization', `Bearer ${token}`);
    
    if (method === 'post' || method === 'put') {
      req.send(data);
    }
    
    return req;
  },

  // Register a user via API
  async registerUser(userData = {}) {
    const defaultUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };
    
    const user = { ...defaultUser, ...userData };
    const response = await request(app)
      .post('/api/register')
      .send(user);
    
    return response;
  },

  // Login a user via API
  async loginUser(credentials = {}) {
    const defaultCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const creds = { ...defaultCredentials, ...credentials };
    const response = await request(app)
      .post('/api/login')
      .send(creds);
    
    return response;
  }
};

module.exports = apiHelpers; 