const express = require('express');
const { cancelReservation } = require('../controllers/cancelController');
const router = express.Router();

router.post('/', cancelReservation);

module.exports = router;
