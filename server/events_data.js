require('dotenv').config();
const events_data = require('./events.json');
const Event = require('./models/Event');
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Event.create(events_data);
        console.log('Success !!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();

// run this code once