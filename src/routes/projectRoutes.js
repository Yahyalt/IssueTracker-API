const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, projectController.createProject);
router.get('/', authenticate, projectController.getAllProjects);
router.get('/:id', authenticate, projectController.getProject);
router.put('/:id', authenticate, projectController.updateProject);
router.delete('/:id', authenticate, projectController.deleteProject);

module.exports = router;
