require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const connectDB = require('../db/connect')

// Routes
const eventRouter = require('../routes/eventRoutes')
const participantRouter = require('../routes/participantRouter')
app.use('/events', eventRouter)
app.use('/participants', participantRouter)

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