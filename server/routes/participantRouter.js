const express = require('express');
const router = express.Router();

const {getParticipants, registerOnEvent, searchParticipants} = require('../controllers/participant')

router.route('/:id').get(getParticipants).post(registerOnEvent)
router.route('/:id/search').get(searchParticipants)

module.exports = router;