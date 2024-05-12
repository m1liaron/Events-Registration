const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');

// const getEvents = async (req, res) => {
//     console.log('getEvents')
//     try {
//         const events = await Event.find().limit(5);
//         res.status(StatusCodes.OK).json({ events: events});
//     } catch (error){
//         res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
//     }
// };

const sortEvents = async (req, res) => {
    const { sortBy } = req.query;

    try {
        let query = Event.find();

        if (sortBy) {
            query = query.sort({ [sortBy]: 1 });
        }

        const sortedEvents = await query;
        res.json({ success: true, events: sortedEvents});
    } catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const getMoreEvents = async (req,res) => {
    const {page, limit = 10, sortBy} = req.query;

    try {
        let query = Event.find();

        if (sortBy) {
            const sortCriteria = {};
            sortCriteria[sortBy] = 1; // Assuming sorting in ascending order
            query = query.sort(sortCriteria);
        }

        const totalEvents = await Event.countDocuments();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const events = await query.find().skip(startIndex).limit(limit);

        let previousEvents = [];
        if (page > 1) {
            // Fetch events for the previous page
            const prevStartIndex = (page - 2) * limit;
            previousEvents = await Event.find().sort(sortBy).skip(prevStartIndex).limit(limit);
        }

        const pagination = {};

        const haveMoreEvents = endIndex < totalEvents;

        if (endIndex < totalEvents) {
            pagination.next = {
                page: +page + 1,
                limit: +limit,
                sortBy
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: +page - 1,
                limit: +limit,
                sortBy
            };
        }

        const allEvents = [...previousEvents, ...events];
        // Send response with paginated events
        res.json({ success: true, events:allEvents, pagination, haveMoreEvents });
    } catch (error){
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = {
    sortEvents,
    getMoreEvents
};