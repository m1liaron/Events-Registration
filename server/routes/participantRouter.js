const express = require('express');
const router = express.Router();

const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many requests from this IP, please try again after 15 minutes',
    },
});


const {getParticipants, registerOnEvent, searchParticipants} = require('../controllers/participant')

router.route('/:id', apiLimiter).get(getParticipants).post(registerOnEvent)
router.get('/:id/search', apiLimiter,searchParticipants)

module.exports = router;