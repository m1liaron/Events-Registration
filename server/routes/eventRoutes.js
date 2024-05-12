const express = require('express');
const router = express.Router();

const {sortEvents, getMoreEvents} = require('../controllers/event')

router.get('/', getMoreEvents);
router.get('/sortBy', sortEvents);

module.exports = router;