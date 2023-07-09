
const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/get_news', newsController.getNearestDocuments);

module.exports = router;
