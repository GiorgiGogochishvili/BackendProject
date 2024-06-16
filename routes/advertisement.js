const express = require('express');
const router = express.Router();

const adsService = require('../services/adsService');

router.get('/all', adsService.getAll);
router.post('/add', adsService.add);

module.exports = router;