const express = require('express');
const router = express.Router();

const adsService = require('../services/adsService');

router.get('/all',  adsService.getAll);
router.get('/:id', adsService.getOne);
router.post('/add',  adsService.add);
router.delete('/:id',  adsService.delete);
router.put('/:id', adsService.update);
router.put('/approve/:id', adsService.approve);

module.exports = router;