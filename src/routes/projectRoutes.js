const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/get_projects', projectController.getAllProjects);
router.get('/:project_id/get_news', projectController.getNewsByProject);
module.exports = router;
