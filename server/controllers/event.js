const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(StatusCodes.OK).json({ events });
    } catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

module.exports = getEvents;