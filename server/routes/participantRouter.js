const express = require('express');
const router = express.Router();

const {getParticipants, registerOnEvent} = require('../controllers/participant')

router.route('/:id').get(getParticipants).post(registerOnEvent)

module.exports = router;