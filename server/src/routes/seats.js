const express = require('express');
const { getSeats } = require('../controllers/seatsController');
const router = express.Router();

router.get('/', getSeats);

module.exports = router;
