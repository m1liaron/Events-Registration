require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const connectDB = require('./db/connect')

// Routes
const {registerOnEvent, getParticipants} = require('./controllers/participant')
const getEvents = require('./controllers/event')
app.post('/participants', registerOnEvent)
app.get('/participants/:id', getParticipants)
app.get('/events', getEvents)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

start();