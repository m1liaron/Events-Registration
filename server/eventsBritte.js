const axios = require('axios');

// Your Eventbrite API key
const API_KEY = process.env.EVENT_BRITTE_TOKEN;

// URL for Eventbrite's events search endpoint
const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/events/search/';

// Parameters for the events search (you can customize these as needed)
const params = {
    token: API_KEY,
    q: 'music', // Example: searching for music events
    location: 'San Francisco', // Example: searching in San Francisco
};

// Make a GET request to the Eventbrite API
axios.get(EVENTBRITE_URL, { params })
    .then(response => {
        // Handle the response data (list of events)
        const events = response.data.events;
        console.log('List of events:', events);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error fetching events:', error);
    });
