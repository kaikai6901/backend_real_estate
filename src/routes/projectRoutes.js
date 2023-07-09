const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/get_projects', projectController.getAllProjects);

module.exports = router;
