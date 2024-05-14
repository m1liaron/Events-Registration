const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');

const getMoreEvents = async (req,res) => {
    const {page, limit = 10, sortBy = 'title', filterDate} = req.query;

    try {
        let query = Event.find();

        if (filterDate) {
            // If filterDate exists, add date filtering to the query
            query = query.where('event_date').equals(new Date(filterDate));
        }

        const totalEvents = await Event.countDocuments();
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(page * limit, totalEvents);

        const events = await query.skip(startIndex).sort(sortBy).limit(limit);

        let previousEvents = [];
        if (page > 1) {
            // Fetch events for the previous page
            const prevStartIndex = 0;
            let prevQuery = Event.find().sort(sortBy).skip(prevStartIndex).limit(startIndex);

            if (filterDate) {
                // If filterDate exists, apply the same date filtering to the previous events query
                prevQuery = prevQuery.where('event_date').equals(new Date(filterDate));
            }

            previousEvents = await prevQuery;
        }

        const haveMoreEvents = endIndex < totalEvents;

        const allEvents = [...previousEvents, ...events];
        // Send response with paginated events
        res.json({ events:allEvents, haveMoreEvents });
    } catch (error){
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = {
    getMoreEvents,
};