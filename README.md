# IssueTracker-API 🐛

A robust RESTful API for managing software development issues, projects, and team collaboration. Built with Node.js, Express, and PostgreSQL, this API provides complete project and issue tracking functionality with authentication and role-based access.

## 🌟 Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Project Management**: Create, read, update, and delete projects
- **Issue Tracking**: Full CRUD operations for issues with status and priority management
- **Team Collaboration**: Add/remove team members to projects
- **Comment System**: Add comments to issues for better communication
- **Role-Based Access**: Support for admin, developer, and tester roles
- **Database Migrations**: Structured database schema management with Knex.js
- **Comprehensive Testing**: Integration tests with Jest and Supertest

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM/Query Builder**: Knex.js
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **Testing**: Jest, Supertest
- **Development**: Nodemon for hot-reloading

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yahyalt/IssueTracker-API.git
   cd IssueTracker-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   DATABASE_URL=postgresql://username:password@localhost:5432/issuetracker
   TEST_DATABASE_URL=postgresql://username:password@localhost:5432/issuetracker_test
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Run database migrations**
   ```bash
   npm run migrate
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be running on `http://localhost:8000`

## 📊 Database Schema

The application uses the following database tables:

- **users**: User authentication and profile information
- **projects**: Project details
- **issues**: Issue tracking with status and priority
- **project_members**: Many-to-many relationship between users and projects
- **comments**: Comments on issues

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login user and get JWT token | No |

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects` | Create a new project | Yes |
| GET | `/api/projects` | Get all projects | Yes |
| GET | `/api/projects/:id` | Get a specific project | Yes |
| PUT | `/api/projects/:id` | Update a project | Yes |
| DELETE | `/api/projects/:id` | Delete a project | Yes |

### Issues
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/issues` | Create a new issue | No |
| GET | `/api/issues/:id` | Get a specific issue | No |
| GET | `/api/issues/project/:projectId` | Get all issues for a project | No |
| PUT | `/api/issues/:id` | Update an issue | No |
| DELETE | `/api/issues/:id` | Delete an issue | No |

### Project Members
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects/:projectId/members` | Add member to project | Yes |
| GET | `/api/projects/:projectId/members` | Get all project members | Yes |
| DELETE | `/api/projects/:projectId/members/:memberId` | Remove member from project | Yes |
| GET | `/api/projects/users/:userId/projects` | Get all user's projects | Yes |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/comments` | Add comment to an issue | Yes |
| GET | `/api/comments/issue/:issueId` | Get all comments for an issue | Yes |
| PUT | `/api/comments/:id` | Update a comment | Yes |
| DELETE | `/api/comments/:id` | Delete a comment | Yes |

## 📝 Example API Usage

### Register a User
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "developer"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Create a Project (with JWT token)
```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "My Awesome Project",
    "description": "A project to track bugs"
  }'
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with debugging
npm run test:debug
```

## 📁 Project Structure

```
IssueTracker-API/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   ├── issueController.js
│   │   ├── projectController.js
│   │   └── projectMemberController.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT authentication middleware
│   ├── models/                # Database models
│   │   ├── commentModel.js
│   │   ├── issueModel.js
│   │   ├── projectMemberModel.js
│   │   ├── projectModel.js
│   │   └── userModel.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── issueRoutes.js
│   │   ├── projectMemberRoutes.js
│   │   └── projectRoutes.js
│   └── utils/                 # Utility functions
│       ├── hash.js
│       └── token.js
├── migrations/                # Database migrations
├── tests/                     # Test files
├── index.js                   # Application entry point
├── knexfile.js               # Knex configuration
└── package.json              # Project dependencies
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback last migration
- `npm run migrate:status` - Check migration status
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with authentication middleware
- Role-based access control (Admin, Developer, Tester)
- SQL injection protection with Knex.js parameterized queries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 👤 Author

**Yahya Hafidz**

- GitHub: [@Yahyalt](https://github.com/Yahyalt)
- Project Link: [https://github.com/Yahyalt/IssueTracker-API](https://github.com/Yahyalt/IssueTracker-API)

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate full-stack API development skills
- Implements modern REST API best practices
- Includes comprehensive testing and documentation

---

⭐ If you found this project helpful, please give it a star!
