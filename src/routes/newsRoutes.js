
const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/get_news', newsController.getNearestDocuments);
router.get('/get_projects', newsController.getNearestProjects);
router.get('/get_statistic', newsController.getStatistic)
module.exports = router;
