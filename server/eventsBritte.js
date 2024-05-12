const axios = require('axios');

require('dotenv').config();
const Event = require('./models/Event');
const connectDB = require('./db/connect');

const options = {
    method: 'GET',
    url: 'https://real-time-events-search.p.rapidapi.com/search-events',
    params: {
        query: 'Concerts in San-Francisco',
        start: '0'
    },
    headers: {
        'X-RapidAPI-Key': '812c4f55c7msh8857b9c20af2a37p1a8a08jsn94846147918b',
        'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
    }
};

async function start(){
    try {
        const response = await axios.request(options);
        let data;
        for(let key of response.data.data) {
            data = {
                title: key.name,
                description: key.description,
                event_data:key.start_time,
                organizer: 'Sternenko'
            }
            console.log(data)
        }

        await connectDB(process.env.MONGO_URI);
        await Event.create(data);
        console.log('Success !!!');
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
}
start()