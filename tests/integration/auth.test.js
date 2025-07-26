const request = require('supertest');
const app = require('../../src/app');
const testHelpers = require('../helpers/testHelpers');
const apiHelpers = require('../helpers/apiTestHelpers');

describe('Auth Routes', () => {
  describe('POST /api/register', () => {
    test('should create a new user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'tester'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      // Password should not be returned
      expect(response.body.user.password).toBeUndefined();
    });

    test('should return 400 if email already exists', async () => {
      // Create user first
      await testHelpers.createTestUser({ email: 'existing@example.com' });

      const userData = {
        name: 'Another User',
        email: 'existing@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already exists');
    });
  });

  describe('POST /api/login', () => {
    test('should login successfully with valid credentials', async () => {
      // Create test user first
      const user = await testHelpers.createTestUser({
        email: 'login@example.com'
      });

      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    test('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
}); 