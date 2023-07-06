const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.post('/', newsController.getNearestDocuments);

module.exports = router;
