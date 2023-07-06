const express = require('express');
const summaryController = require('../controllers/summaryController');

const router = express.Router();

router.get('/price_by_date', summaryController.getPriceByDate);
router.get('/price_by_district', summaryController.getPriceByDistrict);

module.exports = router;
