const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

//for issue management
const issueRoutes = require('./routes/issueRoutes');
app.use('/api/issues', issueRoutes);

//for project management
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

const projectMemberRoutes = require('./routes/projectMemberRoutes');
app.use('/api/projects', projectMemberRoutes);



module.exports = app;