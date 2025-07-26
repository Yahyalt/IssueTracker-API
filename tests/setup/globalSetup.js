const testDb = require('./testDb');

// Global setup before each test
beforeEach(async () => {
  // Run migrations for test database
  await testDb.migrate.latest();
});

// Global teardown after each test
afterEach(async () => {
  // Clean up all tables after each test
  await testDb.raw('TRUNCATE TABLE users, projects, issues, project_members, comments RESTART IDENTITY CASCADE');
});

// Close database connection after all tests
afterAll(async () => {
  await testDb.destroy();
}); 