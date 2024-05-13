const express = require('express');
const router = express.Router();

const {getMoreEvents} = require('../controllers/event')

router.get('/', getMoreEvents);

module.exports = router;